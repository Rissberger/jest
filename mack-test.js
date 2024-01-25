const fs = require('fs');
const axios = require('axios');
const MarkovMachine = require('./markov');

async function generateText(path) {
  let text;

  if (path.startsWith('http://') || path.startsWith('https://')) {
    try {
      let res = await axios.get(path);
      text = res.data;
    } catch (err) {
      console.error(`Error fetching ${path}:\n  ${err}`);
      process.exit(1);
    }
  } else {
    try {
      text = fs.readFileSync(path, 'utf8');
    } catch (err) {
      console.error(`Error reading ${path}:\n  ${err}`);
      process.exit(1);
    }
  }

  let mm = new MarkovMachine(text);
  console.log(mm.makeText());
}

let path = process.argv[2];
generateText(path);
