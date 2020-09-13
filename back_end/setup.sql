/*
 * Author: Emmanuel Munoz
 * Date: SEPTEMBER 2020
 * Setup file for SQL database
*/

DROP TABLE IF EXISTS interaction;
DROP TABLE IF EXISTS user;

CREATE TABLE user(
   id          INT NOT NULL AUTO_INCREMENT,
   google_name VARCHAR(200) NOT NULL,
   PRIMARY KEY(id, google_name)
);

CREATE TABLE interaction(
   user_id    INT NOT NULL,
   sim_score  INT NOT NULL,
   user_score INT NOT NULL,
   topic      VARCHAR(200) NOT NULL,
   name       VARCHAR(100) NOT NULL,
   date_made  DATE NOT NULL DEFAULT NOW(),
   FOREIGN KEY (user_id) REFERENCES user(id)
);
