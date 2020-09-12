/*
   Author: Emmanuel Munoz
   Date: FEBRUARY 2020
   This is the main API file for the APM API. It allows users to post pollution updates in their
   area which gets saved to a database.
   Users can also request all available pollution data in all areas.
*/

// DB-PASS: jvsb0olrh7N2klMC

"use strict";
const mysql = require("promise-mysql");
const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const helmet = require("helmet");

app.use(helmet());
// for application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })) // built-in middleware
// for application/json
app.use(express.json()); // built-in middleware
// for multipart/form-data (required with FormData)
app.use(multer().none()); // requires the "multer" module

app.use(cors());

/**
 * @api {get} /statistics Retrieve aggregate statistics regarding pollution data
 * @apiName GetStatistics
 * @apiGroup Admin/User
 *
 * @apiDescription Gets the overall statistics (max, min, avg) for all tracked pollution types and the by-day statistics
 *
 *
 * @apiSuccess {json} overall The object containing the averages, maxs, and minimums for each pollution type
 * @apiSuccess {json} aggregate The object containing the averages for each pollution type by day
 *
 *
 * @apiSuccessExample {String} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "overall": {
 *        "ozone_average": "8.3137255",
 *        "temperature_average": "61.50",
 *        "particulate_average": "30",
 *        "ozone_max": "32.000",
 *        "ozone_min": "6.000",
 *        "temperature_min": "20.00",
 *        "particulate_min": "6"
 *    },
 *    "aggregate": [
 *        {
 *            "ozone_average": "7.5918367",
 *            "temp_average": "53.706122",
 *            "particulate_average": "15.9592",
 *            "day": "2020-03-08"
 *        },
 *        {
 *            "ozone_average": "32.0000000",
 *            "temp_average": "23.000000",
 *            "particulate_average": "N/A",
 *            "day": "2020-03-09"
 *        },
 *        {
 *            "ozone_average": "20.0000000",
 *            "temp_average": "20.000000",
 *            "particulate_average": "N/A",
 *            "day": "2020-03-10"
 *        }
 *    ]
 * }
 *
 * @apiError DBError A database error has occurred.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     "Error: You need to be an admin to access this endpoint"
 */
// app.get("/statistics", async function (req, res) {
//    let db;
//    try {
//       db = await getDB();
//       const statistics = await getStatistics(db);
//       res.set("Content-Type", "application/json");
//       res.json(statistics);
//    } catch (error) {
//       console.log(error);
//    }
//    if(db) {
//       db.end();
//    }
// });

app.get("/trial", cors(), async function (req, res) {
   let db;
   try {
      db = await getDB();
      res.send("it works");
   } catch (error) {
      res.send("it doesn't works");
   }

   if (db) {
      db.end();
   }
});

/**
 * Gets database object.
 * @returns Database object
 */
async function getDB() {
   const database = await mysql.createConnection({
     host: "35.235.126.200",
     port: "3306",
     user: "root",
     password: "root",
     database: "autismdb"
   });
   return database;
}

const PORT = process.env.PORT || 8080;
app.listen(PORT);
