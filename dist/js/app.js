(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var input, morse, output;

morse = require('morse');

input = document.getElementById('input');

output = document.getElementById('output');

input.onchange = function() {
  var encoded;
  encoded = morse.encode(input.value);
  return output.value = encoded;
};



},{"morse":3}],2:[function(require,module,exports){
// copied from http://freenet.msp.mn.us/people/calguire/morse.html
module.exports = {
  'A': '.-',
  'B': '-...',
  'C': '-.-.',
  'D': '-..',
  'E': '.',
  'F': '..-.',
  'G': '--.',
  'H': '....',
  'I': '..',
  'J': '.---',
  'K': '-.-',
  'L': '.-..',
  'M': '--',
  'N': '-.',
  'O': '---',
  'P': '.--.',
  'Q': '--.-',
  'R': '.-.',
  'S': '...',
  'T': '-',
  'U': '..-',
  'V': '...-',
  'W': '.--',
  'X': '-..-',
  'Y': '-.--',
  'Z': '--..',
  'Á': '.--.-', // A with acute accent
  'Ä': '.-.-',  // A with diaeresis
  'É': '..-..', // E with acute accent
  'Ñ': '--.--', // N with tilde
  'Ö': '---.',  // O with diaeresis
  'Ü': '..--',  // U with diaeresis
  '1': '.----',
  '2': '..---',
  '3': '...--',
  '4': '....-',
  '5': '.....',
  '6': '-....',
  '7': '--...',
  '8': '---..',
  '9': '----.',
  '0': '-----',
  ',': '--..--',  // comma
  '.': '.-.-.-',  // period
  '?': '..--..',  // question mark
  ';': '-.-.-',   // semicolon
  ':': '---...',  // colon
  '/': '-..-.',   // slash
  '-': '-....-',  // dash
  "'": '.----.',  // apostrophe
  '()': '-.--.-', // parenthesis
  '_': '..--.-',  // underline
  '@': '.--.-.',  // at symbol from http://www.learnmorsecode.com/
  ' ': '.......'
};

},{}],3:[function(require,module,exports){
module.exports = {
  encode: encode,
  decode: decode,
  map: map,
  tree: tree
};

var map = require('./map');
var tree = require('./tree');

function encode (obj) {
  return maybeRecurse(obj, encodeMorseString);

  function encodeMorseString (str) {
    var ret = str.split('');
    for (var j in ret) {
      ret[j] = map[ret[j].toUpperCase()] || '?';
    }
    return ret.join(' ');
  }
}

function decode (obj, dichotomic) {
  return maybeRecurse(obj, decodeMorseString);

  function decodeMorseString (str) {
    var ret = str.split(' ');
    for (var i in ret) {
      if (!dichotomic) {
        ret[i] = decodeCharacterByMap(ret[i]);
      } else {
        ret[i] = decodeCharacterByDichotomy(ret[i]);
      }
    }
    return ret.join('');
  }
}

function maybeRecurse (obj, func) {
  if (!obj.pop) {
    return func(obj);
  }

  var clone = [];
  var i = 0;
  for (; i < obj.length; i++) {
    clone[i] = func(obj[i]);
  }
  return clone;
}

function decodeCharacterByMap (char) {
  for (var i in map) {
    if (map[i] == char) {
      return i;
    }
  }
  return ' ';
}

function decodeCharacterByDichotomy (char) {
  var sub = char.split('');
  return traverseNodeWithCharacters(tree, sub);

  function traverseNodeWithCharacters (node, chars) {
    var cur = chars.shift();
    if (!node[cur]) {
      return node.stop || '?';
    }
    return traverseNodeWithCharacters(node[cur], chars);
  }
}

},{"./map":2,"./tree":4}],4:[function(require,module,exports){
// might be the dumbest idea I've ever had
module.exports = {
  '.': {
    stop: 'E',
    '.': {
      stop: 'I',
      '.': {
        stop: 'S',
        '.': {
          stop: 'H',
          '.': {
            stop: '5'
          },
          '-': {
            stop: '4'
          }
        },
        '-': {
          stop: 'V',
          '.': {
            stop: 'Ś'
          },
          '-': {
            stop: '3'
          }
        }
      },
      '-': {
        stop: 'U',
        '.': {
          stop: 'F',
          // note lack of -
          '.': {
            stop: 'É'
          }
        },
        '_': {
          stop: 'Ü',
          '.': {
            stop: 'Ð',
            '.': {
              stop: '?'
            },
            '-': {
              stop: '_'
            }
          },
          '-': {
            stop: '2'
          }
        }
      }
    },
    '-': {
      stop: 'A',
      '.': {
        stop: 'R',
        '.': {
          stop: 'L',
          // note lack of .
          '-': {
            stop: 'È',
            '.': {
              stop: '"'
            }
          }
        },
        '-': {
          stop: 'Ä',
          // note lack of -
          '.': {
            stop: '+',
            // note lack of .
            '-': {
              stop: '.'
            }
          }
        }
      },
      '-': {
        stop: 'W',
        '.': {
          stop: 'P',
          // '.': {},
          // TODO can't replicate character -_-
          '-': {
            stop: 'À',
            // note lack of -
            '.': {
              stop: '@'
            }
          }
        },
        '-': {
          stop: 'J',
          '.': {
            stop: 'Ĵ'
          },
          '-': {
            stop: '1',
            // note lack of -
            '.': {
              stop: "'"
            }
          }
        }
      }
    }
  },
  '-': {
    stop: 'T',
    '.': {
      stop: 'N',
      '.': {
        stop: 'D',
        '.': {
          stop: 'B',
          '.': {
            stop: '6',
            // notive lack of .
            '-': {
              stop: '-'
            }
          },
          '-': {
            stop: '='
          }
        },
        '-': {
          stop: 'X',
          // notice lack of -
          '.': {
            stop: '/'
          }
        }
      },
      '-': {
        stop: 'K',
        '.': {
          stop: 'C',
          '.': {
            stop: 'Ç'
          },
          '-': {
            // notice lack of stop
            '.': {
              stop: ';'
            },
            '-': {
              stop: '!'
            }
          }
        },
        '-': {
          stop: 'Y',
          // notice lack of -
          '.': {
            stop: 'Ĥ',
            // notice lack of .
            '-': {
              stop: '()'
            }
          }
        }
      }
    },
    '-': {
      stop: 'M',
      '.': {
        stop: 'G',
        '.': {
          stop: 'Z',
          '.': {
            stop: '7'
          },
          '-': {
            // note lack of stop
            // note lack of .
            '-': {
              stop: ','
            }
          }
        },
        '-': {
          stop: 'Q',
          '.': {
            stop: 'Ĝ'
          },
          '-': {
            stop: 'Ñ'
          }
        }
      },
      '-': {
        stop: 'O',
        '.': {
          stop: 'Ö',
          // note lack of -
          '.': {
            stop: '8',
            // note lack of -
            '.': {
              stop: ':'
            }
          }
        },
        '-': {
          stop: 'CH', // is there a digraph for this?
          '.': {
            stop: '9'
          },
          '-': {
            stop: '0'
          }
        }
      }
    }
  }
};

},{}]},{},[1]);
