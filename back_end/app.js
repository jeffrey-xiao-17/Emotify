/*
   Author: Emmanuel Munoz
   Date: FEBRUARY 2020
   This is the main API file for the APM API. It allows users to post pollution updates in their
   area which gets saved to a database.
   Users can also request all available pollution data in all areas.
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

app.get("/trial", cors(), async function (req, res) {
   let db;
   try {
      db = await getDB();
      res.status(200).send("it works");
   } catch (error) {
      res.status(200).send(error);
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
   const config = {
      user: process.env.SQL_USER,
      database: process.env.SQL_DATABASE,
      password: process.env.SQL_PASSWORD
   };

   const database = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASS
   });
   return database;
}

const PORT = process.env.PORT || 8080;
app.listen(PORT);

module.exports = app;
