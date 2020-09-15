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
const language = require('@google-cloud/language');
const jsdom = require("jsdom");
const got = require("got");

const { JSDOM } = jsdom;
const client = new language.LanguageServiceClient();

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
      connectionLimit: 50,
      // [END cloud_sql_mysql_mysql_limit]

      // [START cloud_sql_mysql_mysql_timeout]
      // 'connectTimeout' is the maximum number of milliseconds before a timeout
      // occurs during the initial connection to the database.
      connectTimeout: 100000000, // 10 seconds
      // 'acquireTimeout' is the maximum number of milliseconds to wait when
      // checking out a connection from the pool before a timeout error occurs.
      acquireTimeout: 100000000, // 10 seconds
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
      console.error(err);
      process.exit(1);
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

app.post("/process", cors(), async function (req, res) {
   if (req.body.text) {
      const document = {
         content: req.body.text,
         type: 'PLAIN_TEXT',
      };
      const [sentimentResult] = await client.analyzeSentiment({document});
      const [entitySentimentResult] = await client.analyzeEntitySentiment({document});
      const results = {
         sentimentResult,
         entitySentimentResult
      };
      res.status(200).json(results).end();
   } else {
      res.status(400).send("To use this endpoint, I need a text parameter.");
   }
});

app.get("/history", cors(), async function (req, res) {
   if (req.query.user) {
      try {
         const userHistory = await getUserHistory(req.query.user, pool);
         res.set("Content-Type", "application/json");
         res.status(200).json(userHistory).end();
      } catch (error) {
         console.error(error);
         dbError(res, error);
      }
   } else {
      res.status(400).send("To use this endpoint, I need a username parameter.");
   }
});

app.post("/submit", cors(), async function (req, res) {
   if (req.body.sim_score && req.body.user_score && req.body.topic && req.body.name
      && req.body.user && req.body.sim) {
      try {
         await submitInteraction(req.body.sim_score, req.body.user_score, req.body.topic,
                                 req.body.name, req.body.user, req.body.sim);
         res.set("Content-Type", "text/plain");
         res.send("Interaction successfully submitted!");
      } catch (error) {
         dbError(res, "");
      }
   } else {
      req.status(400).send("To use this endpoint, I need a valid simulated score, user score, " +
                           "topic, and name");
   }
});

const getHackerNews = async () => {
   const mainResponse = await got("https://news.ycombinator.com/news");
   const dom = new JSDOM(mainResponse.body);
   const subjectList = dom.window.document.querySelectorAll(".athing");
   const chosenSubject = subjectList[Math.floor(Math.random() * subjectList.length)].id;
   const commentResponse = await got(`https://news.ycombinator.com/item?id=${chosenSubject}`);
   const commentdom = new JSDOM(commentResponse.body);
   let allReplies = commentdom.window.document.querySelectorAll(".reply");
   while (allReplies.length > 0) {
       allReplies[0].remove();
       allReplies = commentdom.window.document.querySelectorAll(".reply");
   }
   const subjectTitle = commentdom.window.document.querySelector(".storylink").textContent;
   const commentList = commentdom.window.document.querySelectorAll(".commtext");
   const commentTextList = [];
   for (let i = 0; i < commentList.length; i++) {
      commentTextList.push(commentList[i].textContent);
   }
   const link = `https://news.ycombinator.com/item?id=${chosenSubject}`;
   return [subjectTitle, commentTextList, link];
};

app.get("/source", cors(), async function (req, res) {
   const [title, comments, link] = await getHackerNews();
   const output = {
      link,
      title,
      comments
   };
   res.set("Content-Type", "application/json");
   res.status(200).json(output).end();
});


app.post("/register", cors(), async function (req, res) {
   if (req.body.user && req.body.user.length > 1) {
      try {
         const result = await registerUser(req.body.user, pool);
         if (result) {
             pool.end();
            res.set("Content-Type", "text/plain");
            res.status(200).send("User successfully registered!").end();
         } else {
             dbError(res, "");
         }
      } catch (error) {
          console.error(error);
         dbError(res, error);
      }
   } else {
      res.status(400).send("To use this endpoint, I need a valid username parameter.").end();
   }
});

/**
 * Registers a user's google ID to the database
 * @param {String} user - The user's google ID
 * @param {MYSQLConnection} pool - The connection pool to use for queries
 */
async function registerUser(user, pool) {
   const registrationQuery = "INSERT INTO user(google_name) VALUES (?);";
   const result = await pool.query(registrationQuery, [user]);
   if (result) {
       return true;
   } else {
       return false;
   }
}

/**
 * Submits the info for a users' interaction as well as the sim that was present
 * @param {String} simScore - The simulated score of the users' Interaction
 * @param {String} userScore - The user's score of the interaction
 * @param {String} topic - The topic of discussion of the interaction
 * @param {String} name - The name of the sim
 * @param {String} user - The user's google ID
 * @param {String} accessoryType - The sim's accessory type
 * @param {String} hairColor - The hair color of the sim
 * @param {String} hatColor - The hat color of the sim
 * @param {String} facialHair - The facial hair of the sim
 * @param {String} clothe - The clothe of the sim
 * @param {String} clotheColor - The clothe color of the sim
 * @param {String} skinColor - The color of skin of the sim
 * @param {MYSQLConnection} pool - The connection pool to use for queries
 */
async function submitInteraction(simScore, userScore, topic, name, user, accessoryType,
                                 hairColor, hatColor, facialHair, clothe, clotheColor,
                                 skinColor) {
   const submitSimQuery = "INSERT INTO sim(accessory_type, hair_color, hat_color, facial_hair, " +
                          "clothe, clothe_color, skin_color) VALUES (?, ?, ?, ?, ?, ?, ?);";
   const simResults = await pool.query(submitSimQuery, [accessoryType, hairColor, hatColor,
                                                        facialHair, clothe, clotheColor, skinColor]);
   const simId = simResults.insertId;

   const submitInteractionQuery = "INSERT INTO interaction(user_id, sim_score, user_score, topic" +
                                     ", name, sim_id) " +
                                  "VALUES ((SELECT id FROM user WHERE google_name = ?)" +
                                     ", ?, ?, ?, ?, ?);";
   await pool.query(submitSimQuery, [name, sim_score, user_score, topic, name, simId]);
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
}

/**
 * Delivers a plain text database error message to the user
 * @param {RESPONSE OBJ} res - The response object
 * @param {String} message - The error message to display
 */
function dbError(res, message) {
   res.set("Content-Type", "text/plain");
   res.status(500).send("Something has occurred with the database, please try " +
                                        "again later: " + message).end();
}

const PORT = process.env.PORT || 8080;
app.listen(PORT);

module.exports = app;
