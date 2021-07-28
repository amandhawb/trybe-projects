# Dojo - Countries API

Esse repositório contém a descrição do exercício prático para a Turma 11! Faremos um [Dojo](https://pt.wikipedia.org/wiki/Coding_Dojo) para que esse exercício seja resolvido em grupos.

## Como vai funcionar?

Vocês serão divididos e divididas em **grupos**. Cada grupo ficará em uma breakout room do Zoom. Todas as pessoas do grupo irão contribuir para o código, na seguinte dinâmica:

Teremos um exercício que deverá ser resolvido pelo grupo.

A cada 10 minutos teremos uma _pessoa piloto_. Essa pessoa deverá compartilhar sua tela e será a responsável por escrever o código. As outras pessoas serão co-pilotos, e deverão dizer à pessoa piloto o que ela deve digitar.

A pessoa piloto não pode falar nada, somente escutar. 🙊👂

Quando se passarem 10 minutos, avisaremos para vocês trocarem as pessoas pilotos. A pessoa que estava pilotando deverá fazer um commit e um push para a branch do grupo.

A nova pessoa piloto deverá fazer um pull e compartilhar sua tela para continuar a dinâmica.

A ordem das pessoas pilotos será definida de forma alfabética reversa, ou seja, em um grupo com Maria, João, José e Antônio, a ordem será:

- Maria
- José
- João
- Antônio

### Antes de começar

Todas as pessoas do grupo deverão clonar esse projeto.

A **primeira** pessoa piloto do grupo deverá criar a branch do grupo com a seguinte nomenclatura: `equipe-n` sendo n o número da breakout room. Por exemplo, se eu faço do grupo 9 e sou a primeira pessoa piloto:

```
git checkout -b equipe-9
```

### Quando der os 10 minutos

A pessoa piloto deverá parar no ponto em que está e fazer um commit e um push para a branch da equipe:

```
git add .
git commit -m "Incomplete code, switching pilots"
git push origin equipe-9
```

A nova pessoa piloto deverá compartilhar sua tela e baixar o código:

```
git checkout equipe-9
git pull origin equipe-9
```

## Instruções do exercício

Vocês farão uma pequena aplicação com a API de países que se escontra [aqui](https://restcountries.eu/).

### Requisito 1

Exiba na tela uma lista contendo o nome dos países em português. Por exemplo, você deve exibir Estados Unidos ao invés de United States e Espanha ao invés de Spain.

> Dica: observem a pasta services. Já existe uma função implementada que retorna as informações dos países. Lembrem-se dos ciclos de vida dos componentes :)

### Requisito 2

Inclua, junto ao nome do país, uma imagem contendo a sua bandeira. Por exemplo: `🇧🇷 Brasil`

> A imagem da bandeira também pode ser obtida através do retorno da mesma função do arquivo services/countries.js

### Requisito 3

Construa um campo de filtro pelo nome no país. Ou seja: quando a pessoa digitar `es`, a sua aplicação deve exibir todos os países que contêm essa sequência de letras, ex: `es`panha, `es`tados unidos e camarõ`es`

> Utilize o estado para isso

### Requisito 4 - Bônus

Ao clicar em um país, abra uma nova página exibindo os detalhes desse país. Por exemplo as línguas faladas, sua capital, e qualquer outra informação interessante que a API retornar.

> Utilizem React Router para fazer isso :)

### Requisito 5 - Bônus

Caprichem no CSS 💅🏽
