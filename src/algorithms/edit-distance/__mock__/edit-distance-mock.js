class WordPair {
  constructor(word1, word2) {
    this.word1 = word1;
    this.word2 = word2;
  }
}

const other = [];
other.push(new WordPair("apple", "oppa"));
other.push(new WordPair("honda", "hyundai"));
other.push(new WordPair("zeil", "trial"));
other.push(new WordPair("kitten", "sitting"));
other.push(new WordPair("AGGCT", "TGACCTC"));

const randomInt = max => Math.floor(Math.random() * max);

export default () => {
  return other[randomInt(other.length)];
};
