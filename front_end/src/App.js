import React, {useState} from "react";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./Nav";

// Components
import InteractionView from "./Components/InteractionsPage/InteractionView";
import ResultsView from "./Components/ResultsPage/ResultsView";
import HistoryView from "./Components/HistoryPage/HistoryView";
import LoginView from "./Components/LoginPage/LoginView";
import PrivateRoute from "./Components/Routing/PrivateRoute";

function App() {
  const [authed, setAuthed] = useState(true)

  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/" exact component={LoginView} />
        <PrivateRoute
          pathname="/interaction"
          render={() =><InteractionView generatedBot={generateBot}/>}
          authed={authed}
        />
        <PrivateRoute 
          authed={authed} 
          render={()=><ResultsView/>}
          pathname="/results"
        />
        <PrivateRoute 
          authed={authed} 
          pathname="/history" 
          render={()=><HistoryView/>}
        />
        {/* <Route
          path="/interaction"
          render={() => <InteractionView generatedBot={generateBot} />}
          authed={authed}
        />
        <Route authed={authed} path="/results" component={ResultsView} />
        <Route authed={authed} path="/history" component={HistoryView} /> */}
      
      </Switch>
    </Router>
  );
}

export default App;

function generateBot() {
  const configuration = {
    topType:
      TOP_OPTIONS[Math.floor(Math.random() * Math.floor(TOP_OPTIONS.length))],
    accessoriesType:
      ACCESSORIES_OPTIONS[
        Math.floor(Math.random() * Math.floor(ACCESSORIES_OPTIONS.length))
      ],
    hairColor:
      HAIR_COLOR_OPTIONS[
        Math.floor(Math.random() * Math.floor(HAIR_COLOR_OPTIONS.length))
      ],
    hatColor:
      HAT_COLOR_OPTIONS[
        Math.floor(Math.random() * Math.floor(HAT_COLOR_OPTIONS.length))
      ],
    facialHairType:
      FACIAL_HAIR_OPTIONS[
        Math.floor(Math.random() * Math.floor(FACIAL_HAIR_OPTIONS.length))
      ],
    clotheType:
      CLOTHES_OPTIONS[
        Math.floor(Math.random() * Math.floor(CLOTHES_OPTIONS.length))
      ],
    clotheColor:
      HAT_COLOR_OPTIONS[
        Math.floor(Math.random() * Math.floor(HAT_COLOR_OPTIONS.length))
      ],
    eyeType:
      EYE_OPTIONS[Math.floor(Math.random() * Math.floor(EYE_OPTIONS.length))],
    eyebrowType:
      EYEBROW_OPTIONS[
        Math.floor(Math.random() * Math.floor(EYEBROW_OPTIONS.length))
      ],
    mouthType:
      MOUTH_OPTIONS[
        Math.floor(Math.random() * Math.floor(MOUTH_OPTIONS.length))
      ],
    skinColor:
      SKIN_COLOR_OPTIONS[
        Math.floor(Math.random() * Math.floor(SKIN_COLOR_OPTIONS.length))
      ],
  };
  console.log("CONFIGUREATION");
  console.log(configuration);
  return configuration;
}

const TOP_OPTIONS = [
  "NoHair",
  "Eyepatch",
  "Hat",
  "Hijab",
  "Turban",
  "WinterHat1",
  "WinterHat2",
  "WinterHat3",
  "WinterHat4",
  "LongHairBigHair",
  "LongHairBob",
  "LongHairBun",
  "LongHairCurly",
  "LongHairDreads",
  "LongHairCurvy",
  "LongHairFrida",
  "LongHairFro",
  "LongHairFroBand",
  "LongHairNotTooLong",
  "LongHairShavedSides",
  "LongHairMiaWallace",
  "LongHairStraight",
  "LongHairStraight2",
  "LongHairStraightStand",
  "ShortHairDreads01",
  "ShortHairDreads02",
  "ShortHairFrizzle",
  "ShortHairShaggyMullet",
  "ShortHairShortCurly",
  "ShortHairShortRound",
  "ShortHairShortFlat",
  "ShortHairShortWaved",
  "ShortHairSides",
  "ShortHairTheCaesar",
  "ShortHairTheCaesarSidePart",
];

const ACCESSORIES_OPTIONS = [
  "Blank",
  "Kurt",
  "Prescription01",
  "Prescription02",
  "Round",
  "Sunglasses",
  "Wayfarers",
];

const HAIR_COLOR_OPTIONS = [
  "Auburn",
  "Black",
  "Blonde",
  "BlondeGolden",
  "Brown",
  "BrownDark",
  "PastelPink",
  "Platinum",
  "Red",
  "SilverGray",
];

const HAT_COLOR_OPTIONS = [
  "Black",
  "Blue01",
  "Blue02",
  "Blue03",
  "Gray01",
  "Gray02",
  "Heather",
  "PastelBlue",
  "PastelGreen",
  "PastelOrange",
  "PastelRed",
  "PastelYellow",
  "Pink",
  "Red",
  "White",
];

const FACIAL_HAIR_OPTIONS = [
  "Blank",
  "BeardMedium",
  "BeardLight",
  "BeardMagestic",
  "MoustacheFancy",
  "MoustacheMagnum",
];

const CLOTHES_OPTIONS = [
  "BlazerShirt",
  "BlazerSweater",
  "CollarSweater",
  "GraphicShirt",
  "Hoodie",
  "Overall",
  "ShirtCrewNeck",
  "ShirtScoopNeck",
  "ShirtVNeck",
];

const EYE_OPTIONS = [
  "Close",
  "Cry",
  "Default",
  // "Dizzy",
  "EyeRoll",
  "Happy",
  "Hearts",
  "Side",
  "Squint",
  "Surprised",
  "Wink",
  "WinkWacky",
];

const EYEBROW_OPTIONS = [
  "Angry",
  "AngryNatural",
  "Default",
  "DefaultNatural",
  "FlatNatural",
  "RaisedExcited",
  "RaisedExcitedNatural",
  "SadConcerned",
  "SadConcernedNatural",
  "UnibrowNatural",
  "UpDown",
  "UpDownNatural",
];

const MOUTH_OPTIONS = [
  "Concerned",
  "Default",
  "Disbelief",
  "Eating",
  "Grimace",
  "Sad",
  "ScreamOpen",
  "Serious",
  "Smile",
  "Tongue",
  "Twinkle",
  "Vomit",
];

const SKIN_COLOR_OPTIONS = [
  "Tanned",
  "Yellow",
  "Pale",
  "Light",
  "Brown",
  "DarkBrown",
  "Black",
];
