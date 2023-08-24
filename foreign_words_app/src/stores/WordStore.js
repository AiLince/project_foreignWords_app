import { makeAutoObservable } from 'mobx';

class WordStore {
  words = [];

  constructor() {
    makeAutoObservable(this);
  }

  setWords(words) {
    this.words = words;
  }

  addWord(word) {
    this.words.push(word);
  }

  deleteWord(index) {
    this.words.splice(index, 1);
  }

  updateWord(index, word) {
    this.words[index] = word;
  }
}

const wordStore = new WordStore();
export default wordStore;