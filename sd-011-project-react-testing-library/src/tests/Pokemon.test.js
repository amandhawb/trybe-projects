import React from 'react';
import { fireEvent } from '@testing-library/dom';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../renderWithRouter';

describe('Requirement number 2', () => {
  const FIRST_POKEMON = {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
    summary: 'This intelligent Pokémon roasts hard berries with electricity'
    + 'to make them tender enough to eat.',
  };
  const IS_FAVORITE = true;
  const WEIGHT = FIRST_POKEMON.averageWeight.value;
  const UNIT = FIRST_POKEMON.averageWeight.measurementUnit;
  it('should render a card with the Pokémon`s informations', () => {
    const { container, getByTestId, getByAltText } = renderWithRouter(
      <Pokemon
        pokemon={ FIRST_POKEMON }
        isFavorite={ IS_FAVORITE }
      />,
    );
    const div = container.querySelector('.pokemon-overview');
    expect(div).toBeInTheDocument();

    const name = getByTestId('pokemon-name');
    expect(name).toHaveTextContent(FIRST_POKEMON.name);
    const type = getByTestId('pokemon-type');
    expect(type).toHaveTextContent(FIRST_POKEMON.type);
    const weight = getByTestId('pokemon-weight');
    expect(weight).toHaveTextContent(
      `Average weight: ${WEIGHT} ${UNIT}`,
    );
    const image = getByAltText(/sprite/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', FIRST_POKEMON.image);
  });

  it('should shows a nav link', () => {
    const { getByText, history } = renderWithRouter(
      <Pokemon
        pokemon={ FIRST_POKEMON }
        isFavorite={ IS_FAVORITE }
      />,
    );

    const moreDetails = getByText('More details');
    expect(moreDetails).toBeInTheDocument();

    fireEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('should render a icon to the favorites Pokémons', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon
        pokemon={ FIRST_POKEMON }
        isFavorite={ IS_FAVORITE }
      />,
    );

    const icon = getByAltText(/ is marked as favorite/i);
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', '/star-icon.svg');
  });
});
