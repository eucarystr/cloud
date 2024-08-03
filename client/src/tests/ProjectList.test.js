import React from 'react';
import { render, screen } from '@testing-library/react';
import ProjectList from '../components/ProjectList';

test('renders ProjectList component', () => {
  render(<ProjectList />);
  expect(screen.getByText(/Projects/i)).toBeInTheDocument();
});
