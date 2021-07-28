import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Requirement number 4', () => {
  it('should render a heading h2 with the content `Page request not found`', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const heading = getByText('Page requested not found');
    expect(heading).toBeInTheDocument();
  });

  it('should have a image', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const image = getByAltText(/Pikachu crying/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
