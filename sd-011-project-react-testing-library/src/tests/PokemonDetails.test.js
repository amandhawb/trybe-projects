import React from 'react';
import { fireEvent } from '@testing-library/dom';
import PokemonDetails from '../components/PokemonDetails';
import renderWithRouter from '../renderWithRouter';
import Data from '../data';

const POKEMONS = Data;
const ON_UPDATE = function onUpdateFavoritePokemons(pokemonId, isFavorite) {
  ID_FAVORITE[pokemonId] = isFavorite;
};
describe('Requirement number 2', () => {
  const ID_FAVORITE = {
    4: false,
    10: false,
    23: false,
    25: true,
    65: false,
    78: false,
    143: false,
    148: false,
    151: false,
  };
  const MATCH = {
    path: '/pokemons/:id',
    url: '/pokemons/25',
    isExact: true,
    params: {
      id: '25',
    },
  };

  it('should shows datails', () => {
    const { getByText, queryByText } = renderWithRouter(
      <PokemonDetails
        match={ MATCH }
        pokemons={ POKEMONS }
        isPokemonFavoriteById={ ID_FAVORITE }
        onUpdateFavoritePokemons={ ON_UPDATE }
      />,
    );
    const heading = getByText('Pikachu Details');
    expect(heading).toBeInTheDocument();

    const moreDetails = queryByText('More details');
    expect(moreDetails).not.toBeInTheDocument();

    const sumary = getByText('Summary');
    expect(sumary).toBeInTheDocument();
    const sumaryPokemon = getByText(/This intelligent Pokémon/i);
    expect(sumaryPokemon).toBeInTheDocument();
  });

  it('should shows the maps', () => {
    const { getByText, container, getAllByAltText } = renderWithRouter(
      <PokemonDetails
        match={ MATCH }
        pokemons={ POKEMONS }
        isPokemonFavoriteById={ ID_FAVORITE }
        onUpdateFavoritePokemons={ ON_UPDATE }
      />,
    );

    const heading = getByText(/Game Locations of/i);
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Game Locations of Pikachu');
    const locations = container.querySelectorAll('.pokemon-habitat p');
    expect(locations.length).toBe(2);

    const image = getAllByAltText('Pikachu location');
    expect(image.length).toBe(2);
    expect(image[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(image[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('should be able to favorite a Pokémon', () => {
    const { getByRole, getByAltText, rerender } = renderWithRouter(
      <PokemonDetails
        match={ MATCH }
        pokemons={ POKEMONS }
        isPokemonFavoriteById={ ID_FAVORITE }
        onUpdateFavoritePokemons={ (id, isFavorite) => {
          console.log('clicado', id);
          ID_FAVORITE[id] = isFavorite;
        } }
      />,
    );

    const inputCheckbox = getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    expect(inputCheckbox).toBeInTheDocument();
    const icon = getByAltText(/is marked as favorite/i);
    expect(icon).toBeInTheDocument();

    fireEvent.click(inputCheckbox);

    rerender(<PokemonDetails
      match={ MATCH }
      pokemons={ POKEMONS }
      isPokemonFavoriteById={ ID_FAVORITE }
      onUpdateFavoritePokemons={ (id, isFavorite) => {
        ID_FAVORITE[id] = isFavorite;
      } }
    />);
    expect(icon).not.toBeInTheDocument();
  });
});
