import React from "react";
import styles from "../../css/LoginView.module.css";
// import SampleButton from "./components/SampleButton";
import GoogleButton from "react-google-button";

function LoginView() {
  return (
    <div className={styles.LoginView}>
      <h1 className={styles.titleText}>EMOTIFY</h1>

      <div className={styles.buttonContainer}>
        <GoogleButton
          onClick={() => {
            console.log("Google button clicked");
          }}
        />
      </div>
    </div>
  );
}

export default LoginView;
