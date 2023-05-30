import _ from 'lodash';

export default class HuffmanEncoder {
    constructor(characterArray, useHashmap) {    
      var self = this;
      self.startTimer();    
      self.hashmap = {};
      self.data = [];
      self.useHashmap = useHashmap || false;    
      const frequencies = self.findFrequencies(characterArray);    
      this.tree = self.constructTree(frequencies);
      this.encoded = self.encode(characterArray);
      self.hashmap = _.invert(self.hashmap);
      self.endTimer();
    }
    
    endTimer() {
      var self = this;
      self.timer.end = performance.now();
      self.timer.duration = self.timer.end - self.timer.start;
    }
    
    startTimer() {
      this.timer = {
        encoding: {},
        decoding: {},
        start: performance.now(),
        end: null,
        duration: null
      };
    }
  
    getSortedData() {
      var self = this;
      return _.sortBy(self.data, 'freq');
    }
  
    findFrequencies(values) {
      const frequencies = _.groupBy(values);
      const mappedSum = _.mapValues(frequencies, (valueList) => {
        return { freq: valueList.length, char: valueList[0] }
      })
      return this.sortFrequencies(Object.values(mappedSum));
    }
  
    sortFrequencies(frequencies) {
      return _.sortBy(frequencies, ['freq']);
    }
  
    constructTree(frequencies) {
      while (frequencies.length > 1) {
        let leftNode = frequencies.shift();
        let rightNode = frequencies.shift();
        let newNode = {
          left: leftNode,
          right: rightNode,
          char: null,
          freq: leftNode.freq + rightNode.freq
        }
        frequencies.unshift(newNode);
        frequencies = this.sortFrequencies(frequencies);
      }
      return frequencies[0];
    }
    
    mostFrequentChar() {
      var self = this;
      var sorted = _.sortBy(self.data, 'freq').reverse();
      console.log("Most Freq", sorted[0]);
      return sorted[0];
    }
    
    leastFrequentChar() {
      var self = this;
      var sorted = _.sortBy(self.data, 'freq');
      console.log("Most Freq", sorted[0]);
      return sorted[0];
    }
  
    encode(inputString) {
      var self = this;
      self.timer.encoding.start = performance.now();
      let binaryEncoding = inputString.split('').map(function(character) {
        if (self.useHashmap) {        
          // when toggled ON, use a hashmap to prevent searching the tree for characters we have already encoded
          if (self.hashmap[character]) {          
            return self.hashmap[character];
          } else {          
            return self.encodeCharacter(character, self.tree, []);  
          }
        } else {
          // when toggled OFF, always search the tree to determine the character's binary encoding
          return self.encodeCharacter(character, self.tree, []);  
        }      
      }).join('');
      self.timer.encoding.end = performance.now();
      self.timer.encoding.duration = self.timer.encoding.end - self.timer.encoding.start;
      return binaryEncoding;
    }
  
    encodeCharacter(character, node, encodedBinary) {
      var self = this;
      if (node == null) {
        return null;
      }
      if (node.char == character) {
        let characterEncoded = encodedBinary.join('');
        if (self.useHashmap) {      
          self.hashmap[character] = characterEncoded;        
        }      
        self.data.push({ 'char': character, 'freq': node.freq, 'encoded': characterEncoded });            
        return characterEncoded;
      }
      let leftSearch = this.encodeCharacter(character, node.left, encodedBinary.concat(['0']));
      if (leftSearch) {
        return leftSearch;
      }
      let rightSearch = this.encodeCharacter(character, node.right, encodedBinary.concat(['1']))
      if (rightSearch) {
        return rightSearch;
      }
      return null;
    }
  
    decodeUsingTree(binaryArray) {    
      let outputArray = [];
      let currentNode = this.tree;
      for (let binaryNumber of binaryArray) {
        if (binaryNumber == '0') {
          currentNode = currentNode.left;
        } else {
          currentNode = currentNode.right;
        }
        if (currentNode.char != null) {
          outputArray.push(currentNode.char);
          currentNode = this.tree;
        }
      }
      return outputArray.join('');
    }
  
    decodeUsingHashmap(binaryArray) {
      var self = this;
      var outputArray = [];    
      var cursor = "";
      for (let binaryDigit of binaryArray) {      
        cursor += binaryDigit;
        if (self.hashmap[cursor]) {
          let character = self.hashmap[cursor];
          outputArray.push(character);
          cursor = "";
        }
      }
      return outputArray.join('');
    }
  
    decode(binaryString) {
      try {
        var self = this;
        self.timer.decoding.start = performance.now();
        var output = null;
        var binaryArray = binaryString.split('');
        if (self.useHashmap) {
          output = this.decodeUsingHashmap(binaryArray);
        } else {
          output = this.decodeUsingTree(binaryArray);        
        }
        self.timer.decoding.end = performance.now();
        self.timer.decoding.duration = self.timer.decoding.end - self.timer.decoding.start;
        return output;     
      } catch(ex) {
        console.error("DECODING ERROR: ", ex);
      }    
    }
  
    toString() {
      return JSON.stringify(this.tree);
    }
  
  }
  