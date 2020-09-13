import React from "react";
import styles from "../../css/LoginView.module.css";
import GoogleButton from "react-google-button";
import {randomAvatarConfiguration} from '../../Avatar'
import IntroAvatar from './components/IntroAvatar'

function LoginView() {

  var avatars = []
  for (let i = 0; i < 500; i++) {
    avatars.push(randomAvatarConfiguration())
  }

  return (
    <div className={styles.LoginView}>
      <div 
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          position: 'absolute',
          zIndex: -1,
          opacity: .3
        }}
      >
        {avatars.map(avatar => (
          <IntroAvatar 
            bot={avatar}
          />
        ))}
      </div>
      <h1 className={styles.titleText}>EM😮TIFY</h1>
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