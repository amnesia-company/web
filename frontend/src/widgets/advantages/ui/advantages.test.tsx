import { screen } from '@testing-library/react';
import { renderWithProviders } from 'shared/tests/renderWithProviders';
import { Advantages } from './advantages';

describe('Advantages section with heading and server highlights', () => {
  it('renders the section heading in uppercase', () => {
    renderWithProviders(<Advantages />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('INDEX.ADVANTAGESTITLE');
  });

  it('renders all three advantage items in uppercase', () => {
    renderWithProviders(<Advantages />);
    expect(screen.getByText('INDEX.ADVANTAGE1')).toBeInTheDocument();
    expect(screen.getByText('INDEX.ADVANTAGE2')).toBeInTheDocument();
    expect(screen.getByText('INDEX.ADVANTAGE3')).toBeInTheDocument();
  });

  it('hides all decorative elements from screen readers', () => {
    const { container } = renderWithProviders(<Advantages />);
    expect(container.querySelectorAll("[aria-hidden='true']")).toHaveLength(9);
  });

  it('passes additional HTML attributes to the section element', () => {
    const { container } = renderWithProviders(<Advantages id="test-section" />);
    expect(container.querySelector('section#test-section')).toBeInTheDocument();
  });
});
