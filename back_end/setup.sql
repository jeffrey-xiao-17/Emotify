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

CREATE TABLE sim(
   id             INT NOT NULL AUTO_INCREMENT,
   accessory_type VARCHAR(100) NOT NULL,
   hair_color     VARCHAR(100) NOT NULL,
   hat_color      VARCHAR(100) NOT NULL,
   facial_hair    VARCHAR(100) NOT NULL,
   clothe         VARCHAR(100) NOT NULL,
   clothe_color   VARCHAR(100) NOT NULL,
   eye_type       VARCHAR(100) NOT NULL DEFAULT "Default",
   eyebrow_type   VARCHAR(100) NOT NULL DEFAULT "Default",
   mouth_type     VARCHAR(100) NOT NULL DEFAULT "Default",
   skin_color     VARCHAR(100) NOT NULL,
   PRIMARY KEY(id)
);


CREATE TABLE interaction(
   user_id    INT NOT NULL,
   sim_score  INT NOT NULL,
   user_score INT NOT NULL,
   topic      VARCHAR(200) NOT NULL,
   name       VARCHAR(100) NOT NULL,
   sim_id     INT NOT NULL,
   date_made  DATETIME NOT NULL DEFAULT NOW(),
   FOREIGN KEY (user_id) REFERENCES user(id),
   FOREIGN KEY (sim_id) REFERENCES sim(id)
);
