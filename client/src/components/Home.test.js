// src/components/Home.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';

describe('Home Component', () => {
  test('renders without crashing', () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    // Check if Header component is rendered
    expect(screen.getByRole('banner')).toBeInTheDocument();

    // Check if the slideshow section is rendered
    expect(screen.getByText(/As seen on/i)).toBeInTheDocument();

    // Check if the about section is rendered
    expect(screen.getByText(/About/i)).toBeInTheDocument();
  });

  test('slideshow changes images at specified interval', () => {
    jest.useFakeTimers();
    render(
      <Router>
        <Home />
      </Router>
    );

    const firstImage = screen.getByAltText('pic of crcocs');
    expect(firstImage).toBeInTheDocument();

    // Fast-forward time by 2000ms
    jest.advanceTimersByTime(2000);

    const secondImage = screen.getByAltText('pic of crcocs');
    expect(secondImage).toBeInTheDocument();

    jest.useRealTimers();
  });

  test('navigation links are working correctly', () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    // Check if the navigation links are present
    expect(screen.getByText(/Jackets/i)).toBeInTheDocument();
    expect(screen.getByText(/Crocs/i)).toBeInTheDocument();
    expect(screen.getByText(/Sneakers/i)).toBeInTheDocument();
    expect(screen.getByText(/Boots/i)).toBeInTheDocument();

    // Simulate clicks on navigation links and verify navigation
    fireEvent.click(screen.getByText('Jackets'));
    expect(window.location.pathname).toBe('/jackets');

    fireEvent.click(screen.getByText('Crocs'));
    expect(window.location.pathname).toBe('/crocs');

    fireEvent.click(screen.getByText('Sneakers'));
    expect(window.location.pathname).toBe('/sneakers');

    fireEvent.click(screen.getByText('Boots'));
    expect(window.location.pathname).toBe('/boots');
  });

  test('social media icons are present and have correct links', () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    // Check if the social media icons are present and have the correct links
    const facebookIcon = screen.getByRole('link', { name: /facebook/i });
    expect(facebookIcon).toHaveAttribute('href', 'https://m.facebook.com/DesignHerInc');

    const instagramIcon = screen.getByRole('link', { name: /instagram/i });
    expect(instagramIcon).toHaveAttribute('href', 'https://www.instagram.com/designher_incllc?utm_source=qr&igshid=YjE5NDMyY2FhOQ%3D%3D&img_index=1');

    const tiktokIcon = screen.getByRole('link', { name: /tiktok/i });
    expect(tiktokIcon).toHaveAttribute('href', 'https://www.tiktok.com/@designher_inc');
  });

  test('about section contains the correct content', () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    // Check if the about section is present and contains the correct text
    expect(screen.getByText(/DesignHerInc Custom Kreations/i)).toBeInTheDocument();
  });
});
