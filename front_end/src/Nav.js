import React from "react";
import styles from "./css/App.module.css";
import cx from "classnames";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className={styles.center}>
      <div class="ui large pointing secondary menu">
        <div className={cx("ui container", "right item")}>
          <a class="item">APP TITLE PLACEHOLDER</a>
        </div>
        <div class="right item">
          <Link to="/">
            <a class="active item">Conversation</a>
          </Link>
          <a class="item">Results</a>
          <a class="item">History</a>
        </div>
      </div>
    </div>
  );
}

export default Nav;
