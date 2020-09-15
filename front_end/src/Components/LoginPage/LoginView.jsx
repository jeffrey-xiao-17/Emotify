import React from "react";
import styles from "../../css/LoginView.module.css";
import GoogleButton from "react-google-button";
import { randomAvatarConfiguration } from "../../Avatar";
import IntroAvatar from "./components/IntroAvatar";

function LoginView() {
  var avatars = [];
  for (let i = 0; i < 250; i++) {
    avatars.push(randomAvatarConfiguration());
  }

  return (
    <div className={styles.LoginView}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          position: "absolute",
          zIndex: -1,
          opacity: 0.3,
          justifyContent: "space-around",
        }}
      >
        {avatars.map((avatar, i) => (
          <IntroAvatar key={i} bot={avatar} />
        ))}
      </div>
      <h1 className={styles.titleText}>
        EM
        <span role="img" aria-label="surprised">
          😮
        </span>
        TIFY
      </h1>
      <div className={styles.buttonContainer}>
        <GoogleButton
          onClick={() => {
            // login with google, then if logged in:
            // setAuthed(true)
            console.log("Google button clicked");
          }}
        />
      </div>
    </div>
  );
}

export default LoginView;
