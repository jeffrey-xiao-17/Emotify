async function quickstart() {
  // Imports the Google Cloud client library
  const language = require('@google-cloud/language');

  // Creates a client
  const client = new language.LanguageServiceClient();

  /**
   * TODO(developer): Uncomment the following line to run this code.
   */
  const text = `I completely agree. When rules aren't codified it invites biased interpretation of them.

  However....
  
  I've worked on an internal communications platform. For some reason people would forget that they were on a corporate site with their corporate email linked to it and spew garbage that any decent person would be embarrassed to say out loud.
  
  So we deliberately didn't codify our rules. We chose not to because we were aware that if we did then people would deliberately cozy up as close to the line as they could, and that wasn't the kind of environment we wanted to foster.
  
  We avoided bias by removing information about the flagger or flagee when content was flagged and judged it based on the content ourselves. After we judged we'd look up who was responsible for the content, and if we felt they were doing some penetration testing to see exactly where those lines were we would start to loop in their manager, HR, legal, and anyone else we felt should be aware. Our escalation procedure went up to banning, though nobody ever reached that point. And our content improved.
  
  If the story ended there I would still be against not having codified rules, but begrudgingly accept that it worked in that situation.
  
  Unfortunately the story doesn't end there. Staff was hired so that engineers wouldn't be responsible for this. The staff was less familiar with the ecosystem and they proceeded to clamp down more and more on acceptable content. They cozied up to HR and legal who were never really comfortable with the permissiveness of the platform, and received praise and additional funding to grow the team for these clampdowns.
  
  I left the project and haven't looked back.
  
  You're right, "I'll know it when I see it" is a garbage sentiment that at best is a cop out, but too often is used to withhold rules and keep people in the dark as a power play, or even squash dissenters with arbitrary and unbalanced application of force.`;

  // Prepares a document, representing the provided text
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Detects sentiment of entities in the document
  const [result] = await client.analyzeEntitySentiment({document});
  const entities = result.entities;

  console.log('Entities and sentiments:');
  entities.forEach(entity => {
    console.log(`  Name: ${entity.name}`);
    console.log(`  Type: ${entity.type}`);
    console.log(`  Score: ${entity.sentiment.score}`);
    console.log(`  Magnitude: ${entity.sentiment.magnitude}`);
  });
}

quickstart();