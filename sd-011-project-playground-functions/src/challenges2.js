// Desafio 10
function techList(array, name) {
  let result = [];
  if (array.length === 0) {
    return 'Vazio!';
  }

  array.sort();
  for (let i = 0; i < array.length; i += 1) {
    let objeto = {
      tech: array[i],
      name,
    };
    result.push(objeto);
  }
  return result;
}
// Desafio 11
function repeatedNumber(array, number) {
  let counter = 0;
  for (let index = 0; index < array.length; index += 1) {
    if (array[index] === number) {
      counter += 1;
    }
  }
  return counter;
}

function generatePhoneNumber(array) {
  if (array.length !== 11) {
    return 'Array com tamanho incorreto.';
  }
  for (let i = 0; i < array.length; i += 1) {
    if (array[i] < 0 || array[i] > 9 || repeatedNumber(array, array[i]) >= 3) {
      return 'não é possível gerar um número de telefone com esses valores';
    }
  }
  let ddd = array.slice(0, 2).join('');
  let perf = array.slice(2, 7).join('');
  let sulf = array.slice(7).join('');
  return '(' + ddd + ') ' + perf + '-' + sulf;
}
console.log(generatePhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1]));

// Desafio 12
function triangleCheck(lineA, lineB, lineC) {
  let cond1 = Math.abs(lineB - lineC) < lineA && lineA < lineB + lineC;
  let cond2 = Math.abs(lineA - lineC) < lineB && lineB < lineA + lineC;
  let cond3 = Math.abs(lineA - lineB) < lineC && lineC < lineA + lineB;
  return cond1 && cond2 && cond3;
}

// Desafio 13
function hydrate(string) {
  let regex = /\d+/g;
  let myNumbers = string.match(regex);
  let result = 0;
  for (let i = 0; i < myNumbers.length; i += 1) {
    result += parseInt(myNumbers[i], 10);
  }
  let copoPalavra = 'copo';
  if (result > 1) {
    copoPalavra = 'copos';
  }
  return result + ' ' + copoPalavra + ' de água';
}
console.log(hydrate('1 cachaça, 0 cervejas e 0 copo de vinho'));

module.exports = {
  generatePhoneNumber,
  techList,
  hydrate,
  triangleCheck,
};
