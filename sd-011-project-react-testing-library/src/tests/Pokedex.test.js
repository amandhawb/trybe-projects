import React from 'react';
import { fireEvent } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import renderWithRouter from '../renderWithRouter';
import Data from '../data';

const ID_FAVORITE = {
  4: false,
  10: false,
  23: false,
  25: true,
  65: true,
  78: false,
  143: false,
  148: false,
  151: false,
};
const TYPE_POKEMON = 'pokemon-type';
const POKEMONS = Data;
const THREE = 3;
const SEVEN = 7;

describe('Requirement number 5', () => {
  it('should render a heading with the text `Encountered pokémons`', () => {
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ POKEMONS }
        isPokemonFavoriteById={ ID_FAVORITE }
      />,
    );
    const heading = getByText('Encountered pokémons');
    expect(heading).toBeInTheDocument();
  });

  it('should shows the next pokémon when the button is clicked', () => {
    const { getByTestId } = renderWithRouter(<Pokedex
      pokemons={ POKEMONS }
      isPokemonFavoriteById={ ID_FAVORITE }
    />);

    const button = getByTestId('next-pokemon');
    expect(button).toHaveTextContent('Próximo pokémon');

    for (let i = 1; i < Data.length; i += 1) {
      fireEvent.click(button);
      const name = getByTestId('pokemon-name');
      const type = getByTestId(TYPE_POKEMON);
      const weight = getByTestId('pokemon-weight');
      expect(name).toHaveTextContent(Data[i].name);
      expect(type).toHaveTextContent(Data[i].type);
      expect(weight).toHaveTextContent(Data[i].averageWeight.value);
    }
    fireEvent.click(button);
    const name = getByTestId('pokemon-name');
    const type = getByTestId(TYPE_POKEMON);
    const weight = getByTestId('pokemon-weight');
    expect(name).toHaveTextContent(Data[0].name);
    expect(type).toHaveTextContent(Data[0].type);
    expect(weight).toHaveTextContent(Data[0].averageWeight.value);
  });

  it('should render just one Pokémon at a time', () => {
    const { container } = renderWithRouter(<Pokedex
      pokemons={ POKEMONS }
      isPokemonFavoriteById={ ID_FAVORITE }
    />);
    const div = container.querySelectorAll('.pokemon-overview p');
    expect(div.length).toBe(THREE);
  });

  it('should render the buttons and the type needs to be the same as Pokémon', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ POKEMONS }
        isPokemonFavoriteById={ ID_FAVORITE }
      />,
    );

    const buttons = getAllByTestId('pokemon-type-button');
    expect(buttons.length).toBe(SEVEN);

    const button = buttons[0];
    fireEvent.click(button);
    const type = getByTestId(TYPE_POKEMON);
    expect(type).toHaveTextContent(button.innerHTML);

    // for(let i = 1; i < buttons.length; i +=1) {
    //   fireEvent.click(buttons[i]);
    //   const type = getAllByTestId(TYPE_POKEMON);
    //   expect(type).toHaveTextContent(buttons[i].key);
    // }
  });

  it('should render the button to reset the filter', () => {
    const { getByText, getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ POKEMONS }
        isPokemonFavoriteById={ ID_FAVORITE }
      />,
    );
    const buttonAll = getByText('All');
    expect(buttonAll).toBeInTheDocument();

    fireEvent.click(buttonAll);
    const type = getByTestId(TYPE_POKEMON);
    expect(type).toHaveTextContent(Data[0].type);
  });

  it('should create a filter button for all kind of Pokémons', () => {
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ POKEMONS }
        isPokemonFavoriteById={ ID_FAVORITE }
      />,
    );

    const allTypes = [];
    for (let i = 0; i < Data.length; i += 1) {
      if (!allTypes.includes(Data[i].type)) {
        allTypes.push(Data[i].type);
      }
    }

    for (let i = 0; i < allTypes.length; i += 1) {
      const button = getByText(allTypes[i], { selector: 'button' });
      expect(button).toBeInTheDocument();
    }
    // const buttons = getAllByTestId('pokemon-type-button');
  // const type = getAllByTestId(TYPE_POKEMON);
  //   expect(type).toHaveTextContent(buttons[i].key);
  //   expect(buttons[i].value).toHaveTextContent(type);
  });
});
