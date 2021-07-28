const assert = require('assert');
const productDetails = require('../src/productDetails');

/*
  Dadas duas strings que representam nomes de produtos, retorne um array contendo dois objetos com os detalhes dos respectivos produtos.

  Parâmetros:
  - Uma string;
  - Uma string;

  Comportamento:
  productDetails('Alcool gel', 'Máscara') // Retorna:
  [
    {
      name: 'Alcool gel'
      details: {
        productId: 'Alcool gel123'
      }
    },
    {
      name: 'Máscara'
      details: {
        productId: 'Máscara123'
      }
    }
  ]

  OBS: Lembre-se que você não precisa se preocupar com o describe e o it por enquanto, isso será aprendido posteriormente.
*/

describe('6 - Implemente os casos de teste para a função `productDetails`', () => {
  it('Verifica se a função `productDetails` tem o comportamento esperado', () => {
    // ESCREVA SEUS TESTES ABAIXO:
    // Teste que o retorno da função é um array.
    assert.deepStrictEqual(Array.isArray(productDetails()), true);
    // Teste que o array retornado pela função contém dois itens dentro.
    assert.deepStrictEqual(productDetails().length, 2)
    // Teste que os dois itens dentro do array retornado pela função são objetos.
    const expected = productDetails('a', 'b');
    assert.deepStrictEqual([typeof expected[0], typeof expected[1]], ['object', 'object']);
    // Teste que os dois objetos são diferentes entre si.
    assert.deepStrictEqual(expected[0] !== expected[1], true);
    // (Difícil) Teste que os dois productIds terminam com 123.
    const productId1 = expected[0].details.productId;
    const productId2 = expected[1].details.productId;
    assert.deepStrictEqual(productId1.indexOf('123'), productId1.length-3);
    assert.deepStrictEqual(productId2.indexOf('123'), productId2.length-3);
  });
});
