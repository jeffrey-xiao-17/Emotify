/*
   Author: Emmanuel Munoz
   Date: SEPTEMBER 2020
   This is the main API file for the Emotify API. It allows users to see their interaction history.
*/

// DB-PASS: jvsb0olrh7N2klMC

"use strict";
require('dotenv').config();

const mysql = require("promise-mysql");
const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");

// for application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })) // built-in middleware
// for application/json
app.use(express.json()); // built-in middleware
// for multipart/form-data (required with FormData)
app.use(multer().none()); // requires the "multer" module

app.use(cors());

/**
 * Gets database object.
 * @returns Database object
 */
// [START cloud_sql_mysql_mysql_create_tcp]
const createTcpPool = async (config) => {
   // Extract host and port from socket address
   const dbSocketAddr = process.env.DB_HOST.split(":")

   // Establish a connection to the database
   return await mysql.createPool({
      user: process.env.DB_USER, // e.g. 'my-db-user'
      password: process.env.DB_PASS, // e.g. 'my-db-password'
      database: process.env.DB_NAME, // e.g. 'my-database'
      host: dbSocketAddr[0], // e.g. '127.0.0.1'
      port: dbSocketAddr[1], // e.g. '3306'
   });
}
 // [END cloud_sql_mysql_mysql_create_tcp]

 // [START cloud_sql_mysql_mysql_create_socket]
const createUnixSocketPool = async (config) => {
   const dbSocketPath = process.env.DB_SOCKET_PATH || "/cloudsql";

   // Establish a connection to the database
   return await mysql.createPool({
      user: process.env.DB_USER, // e.g. 'my-db-user'
      password: process.env.DB_PASS, // e.g. 'my-db-password'
      database: process.env.DB_NAME, // e.g. 'my-database'
      // If connecting via unix domain socket, specify the path
      socketPath: `${dbSocketPath}/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
   });
}
 // [END cloud_sql_mysql_mysql_create_socket]

const createPool = async () => {
   const config = {
      // [START cloud_sql_mysql_mysql_limit]
      // 'connectionLimit' is the maximum number of connections the pool is allowed
      // to keep at once.
      connectionLimit: 5,
      // [END cloud_sql_mysql_mysql_limit]

      // [START cloud_sql_mysql_mysql_timeout]
      // 'connectTimeout' is the maximum number of milliseconds before a timeout
      // occurs during the initial connection to the database.
      connectTimeout: 10000, // 10 seconds
      // 'acquireTimeout' is the maximum number of milliseconds to wait when
      // checking out a connection from the pool before a timeout error occurs.
      acquireTimeout: 10000, // 10 seconds
      // 'waitForConnections' determines the pool's action when no connections are
      // free. If true, the request will queued and a connection will be presented
      // when ready. If false, the pool will call back with an error.
      waitForConnections: true, // Default: true
      // 'queueLimit' is the maximum number of requests for connections the pool
      // will queue at once before returning an error. If 0, there is no limit.
      queueLimit: 0, // Default: 0
      // [END cloud_sql_mysql_mysql_timeout]

      // [START cloud_sql_mysql_mysql_backoff]
      // The mysql module automatically uses exponential delays between failed
      // connection attempts.
      // [END cloud_sql_mysql_mysql_backoff]
   }
   if (process.env.DB_HOST) {
      return await createTcpPool(config);
   } else {
      return await createUnixSocketPool(config);
   }
};

let pool;
const poolPromise = createPool()
   .catch((err) => {
      process.exit(1)
   }
);

app.use(async (req, res, next) => {
  if (pool) {
    return next();
  }
  try {
    pool = await poolPromise;
    next();
  }
  catch (err) {
    return next(err);
  }
});


app.get("/history", cors(), async function (req, res) {
   if (req.query.user) {
      try {
         const userHistory = await getUserHistory(req.query.user, pool);
         res.set("Content-Type", "application/json");
         res.json(userHistory);
      } catch (error) {
         dbError(res, "");
      }
   } else {
      res.status(400).send("To use this endpoint, I need a username parameter.");
   }
});

app.post("/register", cors(), async function (req, res) {
   if (req.body.user && req.body.user.length > 1) {
      try {
         await registerUser(req.body.user, pool);
         res.set("Content-Type", "text/plain");
         res.send("User successfully registered!");
      } catch (error) {
         dbError(res, "");
      }
   } else {
      res.status(400).send("To use this endpoint, I need a valid username parameter.");
   }
});

/**
 * Registers a user's google ID to the database
 * @param {String} user - The user's google ID
 * @param {MYSQLConnection} pool - The connection pool to use for queries
 */
async function registerUser(user, pool) {
   const registrationQuery = "INSERT INTO user(google_name) VALUES (?);";
   await pool.query(registrationQuery, [user]);
}

/**
 * Delivers a plain text database error message to the user
 * @param {String} user - The user's google ID
 * @param {MYSQLConnection} pool - The connection pool to use for queries
 * @return {JSON[]} - Returns an array of JSON, each item being a previous interaction the user has
 *                    made
 */
async function getUserHistory(user, pool) {
   const historyQuery = "SELECT i.sim_score, i.user_score, i.date_made " +
                        "FROM user u, interaction i " +
                        "WHERE u.id = i.user_id AND u.google_name = ? " +
                        "LIMIT 20;";
   const userHistory = await pool.query(historyQuery, [user]);
   return userHistory;
   // return {
   //    average: 5,
   //    lowest:  3,
   //    highest: 7,
   //    history: [
   //       {
   //          personal: 7,
   //          simulated: 4,
   //          date: "3/11/2020"
   //       },
   //       {
   //          personal: 6,
   //          simulated: 5,
   //          date: "3/10/2020"
   //       },
   //       {
   //          personal: 9,
   //          simulated: 8,
   //          date: "6/22/2020"
   //       },
   //       {
   //          personal: 2,
   //          simulated: 3,
   //          date: "5/19/2020"
   //       },
   //       {
   //          personal: 1,
   //          simulated: 2,
   //          date: "3/20/2020"
   //       },
   //    ]
   // };
}

/**
 * Delivers a plain text database error message to the user
 * @param {RESPONSE OBJ} res - The response object
 * @param {String} message - The error message to display
 */
function dbError(res, message) {
   res.set("Content-Type", "text/plain");
   res.status(DATABASE_ERROR_CODE).send("Something has occurred with the database, please try " +
                                        "again later: " + message);
}

const PORT = process.env.PORT || 8080;
app.listen(PORT);

module.exports = app;
