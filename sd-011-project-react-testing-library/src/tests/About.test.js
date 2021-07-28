import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Requirement number 2', () => {
  it('should have the informations about `Pokédex`', () => {
    const { getByText } = renderWithRouter(<About />);
    const about = getByText('About Pokédex');
    expect(about).toBeInTheDocument();
  });

  it('should have two paragraphs', () => {
    const { getByText } = renderWithRouter(<About />);
    const paragraphOne = getByText(/This application/i);
    expect(paragraphOne).toBeInTheDocument();
    const paragraphTwo = getByText(/One can filter/i);
    expect(paragraphTwo).toBeInTheDocument();
  });

  it('should have a image', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const image = getByAltText('Pokédex');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
