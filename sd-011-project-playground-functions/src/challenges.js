// Desafio 1
function compareTrue(value1, value2) {
  return value1 && value2;
}

// Desafio 2
function calcArea(base, height) {
  let multiply = base * height;
  let result = multiply / 2;
  return result;
}

// Desafio 3
function splitSentence(string) {
  let result = string.split(' ');
  return result;
}

// Desafio 4
function concatName(array) {
  let first = array[0];
  let last = array[array.length - 1];
  let result = last.concat(', ', first);
  return result;
}

// Desafio 5
function footballPoints(wins, ties) {
  let resultWins = wins * 3;
  return resultWins + ties;
}

// Desafio 6
function getHighNumber(array) {
  let bigNumber = 0;
  for (let index in array) {
    if (array[index] > bigNumber) {
      bigNumber = array[index];
    }
  }
  return bigNumber;
}

function getNumberOfOcurrences(array, number) {
  let counter = 0;
  for (let index in array) {
    if (array[index] === number) {
      counter += 1;
    }
  }
  return counter;
}

function highestCount(array) {
  let highNumber = getHighNumber(array);
  let result = getNumberOfOcurrences(array, highNumber);
  return result;
}

// Desafio 7
function catAndMouse(mouse, cat1, cat2) {
  let distanciaDoMouseParaCat1 = Math.abs(mouse - cat1);
  let distanciaDoMouseParaCat2 = Math.abs(mouse - cat2);
  if (distanciaDoMouseParaCat1 < distanciaDoMouseParaCat2) {
    return 'cat1';
  }
  if (distanciaDoMouseParaCat2 < distanciaDoMouseParaCat1) {
    return 'cat2';
  }
  return 'os gatos trombam e o rato foge';
}

// Desafio 8
function fizzBuzz(array) {
  let result = [];
  for (let index in array) {
    if (array[index] % 3 === 0 && array[index] % 5 === 0) {
      result.push('fizzBuzz');
    } else if (array[index] % 5 === 0) {
      result.push('buzz');
    } else if (array[index] % 3 === 0) {
      result.push('fizz');
    } else {
      result.push('bug!');
    }
  }
  return result;
}

// Desafio 9
// function encodeUsingIf(string) {
//   let newString = '';
//   for (let index in string) {
//     if (string[index] === 'a') {
//       newString = newString.concat ('1')
//     } else if (string[index] === 'e') {
//       newString = newString.concat ('2')
//     } else if (string[index] === 'i') {
//       newString = newString.concat ('3')
//     } else if (string[index] === 'o') {
//       newString = newString.concat ('4')
//     } else if (string[index] === 'u') {
//       newString = newString.concat ('5')
//     } else {
//       newString = newString.concat (string[index])
//     }
//   }
//   return newString;
// }
// console.log(encodeUsingIf('hi there!'));

function encodeCaracter(caracter) {
  let result = '';
  switch (caracter) {
    case 'a':
      result = '1';
      break;
    case 'e':
      result = '2';
      break;
    case 'i':
      result = '3';
      break;
    case 'o':
      result = '4';
      break;
    case 'u':
      result = '5';
      break;
    default:
      result = caracter;
  }
  return result;
}

function encode(string) {
  let result = [];
  for (let index in string) {
    result.push(encodeCaracter(string[index]));
  }
  return result.join('');
}
console.log(encode('hi there!'));

function decode(string) {
  let result = [];
  for (let index in string) {
    switch (string[index]) {
      case '1':
        result.push('a');
        break;
      case '2':
        result.push('e');
        break;
      case '3':
        result.push('i');
        break;
      case '4':
        result.push('o');
        break;
      case '5':
        result.push('u');
        break;
      default:
        result.push(string[index]);
    }
  }
  return result.join('');
}

module.exports = {
  calcArea,
  catAndMouse,
  compareTrue,
  concatName,
  decode,
  encode,
  fizzBuzz,
  footballPoints,
  highestCount,
  splitSentence,
};
