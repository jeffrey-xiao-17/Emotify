# Emotify
Project built during PennApps XXI. App to help kids with Autism detect sentiment and emotions during conversations.

Link to video demo: [DEMO](https://youtu.be/9WZteVpljoQ)

## Inspiration
Children diagnosed with Autism generally have a more difficult time reading facial expressions and detecting sentiment. This can trickle down to not fully understanding other people's emotions during conversations. Furthermore, it can be difficult to give an objective way of interpreting people's emotions when receiving autism therapy to help with social interactions.

## What it does
Emotify is an all-in-one resource for people with trouble recognizing and interpreting emotion. One of the features is a game where users attempt to boost the mood of others with a limited number of messages. Learning to speak on topic and stating your points concisely is a key skill, and one that we wanted to target. As such, each message sent is parsed using Google NLP, giving us a sentiment score from -1 to 1.

Additionally, we built results and history pages to allow users the chance to see their progress over time. We think it's especially motivating to see your own growth - and it's our hope that the users will too.

## How we built it
We set up a React front-end, splitting the different features of our web app into tabs for easy navigation. On the back-end, we ran our app on Google cloud and used their SQL database service as well as running a natural language processing API offered by Google Cloud Platform.

## Challenges we ran into
We had envisioned a very different app on Friday, one build out of Unity where users could interact with a Sim like world. This way, users will have a more realistic, 3d feel for how to interact with others in a variety of situations. However, none of us were particularly familiar with Unity, so picking that up from scratch was difficult. In the end, we pivoted over to a web app, where we found much more success.

## Accomplishments that we're proud of
We managed to successfully integrate Google's Natural Language Processing API to enable the analysis of our user input and expanding Emotify's functionality despite not having much experience with ML. We are proud of our clean front-end design and simple UI using React as well as being able to leverage tools such as avatar builders and a complex interaction with our back-end.

## What we learned
We worked through several communication issues and working as a team to be more efficient in the distribution of our tasks and leveraging our unique skills to maximize Emotify's functionality.

## What's next for Emotify
Of course, we would like to upgrade this project by transitioning it over to Unity. We still believe that the best way for people to practice interactions and reading facial expressions is through realistic scenarios. Looking ahead, we hope that this idea will benefit many people in world who struggle to pick up on social cues, idioms, and hidden text.

### Built With
 - css3
 - google-cloud
 - javascript
 - mysql
 - node.js
 - react
