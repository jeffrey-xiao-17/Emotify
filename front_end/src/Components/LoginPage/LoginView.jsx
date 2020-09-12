import React from 'react';
import ".../css/LoginView.css"
import SampleButton from './components/SampleButton'

function LoginView() {
  return (
    <div className="LoginView">
      <h1 className="titleText">GAME TITLE</h1>

      <div className = "buttonContainer"> 
        <SampleButton buttonText= {"Log in with Google"}/>
        <SampleButton buttonText= {"Exit"}/>
      </div>
    </div>
  );
}

export default LoginView;
