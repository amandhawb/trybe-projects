import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('Requirement number 2', () => {
  it('should render the message `No favorite pokemon found`.', () => {
    const EMPTY_FAVORITE = '';
    const { getByText } = renderWithRouter(
      <FavoritePokemons
        pokemons={ EMPTY_FAVORITE }
      />,
    );
    const message = getByText('No favorite pokemon found');
    expect(message).toBeInTheDocument();
  });

  it('should render the favorite pokemons.', () => {
    const FAVORITE_POKEMONS = [{
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
      summary: 'This intelligent Pokémon roasts hard berries with electricity to make'
        + 'them tender enough to eat.',
    },
    ];
    const { container } = renderWithRouter(
      <FavoritePokemons
        pokemons={ FAVORITE_POKEMONS }
      />,
    );

    const div = container.querySelector('.favorite-pokemons');
    expect(div).toBeInTheDocument();
    expect(div).toHaveTextContent(/Pikachu/i);
  });
});
