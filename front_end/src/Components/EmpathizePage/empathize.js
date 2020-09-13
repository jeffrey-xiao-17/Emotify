import * as Util from "../../utilities";

import axios from 'axios';

const ANALYZE_ENTITY_SENTIMENT_METHOD =
  "https://language.googleapis.com/v1/documents:analyzeEntitySentiment";


const ACCESS_TOKEN =
  "ya29.c.Ko8B3Afv9eriAEJnvg-riokaH7tz3KKGhpxwy6sEoDTQae8Xi3PYa-iHCCAUGDZWMp8xRphOvxaoIAp7vEG50G9jU-O4hVdtUlDXyPk1GwTPOn1HClBAQXk66ZbE6a4RBJ1tc2TQfxUb22pBHnvDRZasG5nRv7OpHvpiYwRxPns1UuNfXGjPEs36LhpRcR4Dvuc";

export async function analyzeText(text) {
  const response = await axios.post('https://autismproject.uc.r.appspot.com/process', {
    text
  });
  return response.data;
}

// Returns some natural language text and its URL in the format
// [sourceText, link]
export async function getText() {
  return Util.randomOption(SAMPLES);
}
// add export

const SAMPLES = [
  [
    "I HATE GOOGLE I HATE GOOGLE SO MUCH PLEASE LET US LOSE!!!",
    "WFH vs office",
    "https://news.ycombinator.com/item?id=24452280",
  ]
];
