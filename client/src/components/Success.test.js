// src/components/Success.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Success from './Success';

describe('Success Component', () => {
  const renderWithRouter = (initialEntries) => {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/" element={<Success />} />
        </Routes>
      </MemoryRouter>
    );
  };

  test('renders Success component with provided item name', () => {
    renderWithRouter(['/']);

    expect(screen.getByText('Success')).toBeInTheDocument();
    // Replace 'Success' with the actual text or component you are verifying
  });

  test('Go Home button links to home page', () => {
    renderWithRouter(['/']);

    const goHomeButton = screen.getByRole('link', { name: 'Go Home' });
    expect(goHomeButton).toBeInTheDocument();
    // Add further assertions or interactions with the button as needed
  });
});
