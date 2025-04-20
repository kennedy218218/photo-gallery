import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Photo Gallery heading', () => {
  const headingElement = screen.getByText(/photo gallery/i); // matches "📸 Photo Gallery"
  expect(headingElement).toBeInTheDocument();
});

