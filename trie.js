class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (let char of word) {
      if (node.children[char] == null) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }

    node.isEndOfWord = true;
  }

  search(word) {
    let node = this.root;
    for (let char of word) {
      if (node.children[char] == null) {
        return null;
      }

      node = node.children[char];
    }

    return node;
  }

  hasWord(word) {
    const node = this.search(word);
    return node != null ? node.isEndOfWord : false;
  }

  startsWith(prefix) {
    const node = this.search(prefix);
    return node != null;
  }
}
