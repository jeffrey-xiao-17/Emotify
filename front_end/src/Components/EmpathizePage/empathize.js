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
    `This is a complicated problem with different perspectives that no doubt will get muddled at some point. I'm confident at least the following is true:
        Some people have long commutes and wfh is great

        Others have small, expensive apartments they paid for shorter commutes and it's suffocating 40-50 hours a week

        Some people live in palaces and offices are a step down in comfort

        Some people are happy with the online interactions

        Some people are dissatisfied with the online interactions and prefer to talk to humans and not text strings from humans they can't see or hear

        Some people want to work from home some of the time, and go to the office some of the time, and they've wanted that before the apocalypse occurred (puts hand up)

        Cities are nervous that business districts are devastated since no one buys coffee, lunches or walks home and steps into a shoe store or tailor, or to a bar for drinks with colleagues.

        But like much else in our present world, things are presented in black and white, emotive ways.`,
    "WFH vs office",
    "https://news.ycombinator.com/item?id=24452280",
  ]
];
