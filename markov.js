class MarkovMachine {
    constructor(text) {
      let words = text.split(/[ \r\n]+/);
      this.words = words.filter(c => c !== "");
      this.makeChains();
    }
  
    makeChains() {
      this.chains = {};
      for (let i = 0; i < this.words.length; i++) {
        let word = this.words[i];
        let nextWord = this.words[i + 1] || null;
  
        if (!this.chains[word]) {
          this.chains[word] = [];
        }
        this.chains[word].push(nextWord);
      }
    }
  
    makeText(numWords = 100) {
      let keys = Object.keys(this.chains);
      let key = keys[Math.floor(Math.random() * keys.length)];
      let output = [];
  
      while (output.length < numWords && key !== null) {
        output.push(key);
        let nextWords = this.chains[key];
        key = nextWords[Math.floor(Math.random() * nextWords.length)];
      }
  
      return output.join(" ");
    }
  }
  