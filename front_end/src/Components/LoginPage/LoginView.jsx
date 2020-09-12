import React from "react";
import styles from "../../css/LoginView.module.css";
// import SampleButton from "./components/SampleButton";

function LoginView() {
  return (
    <div className={styles.LoginView}>
      <h1 className={styles.titleText}>EMOTIFY</h1>

      <div className={styles.buttonContainer}>
        <button className={styles.button}>Login with Google</button>
        <button className={styles.button}>Exit</button>
      </div>
    </div>
  );
}

export default LoginView;
