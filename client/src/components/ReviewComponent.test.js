// src/components/ReviewComponent.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import ReviewComponent from './ReviewComponent';

describe('ReviewComponent', () => {
  const testProps = {
    headline: 'Great Product!',
    rating: 5,
    review: 'I absolutely loved this product. Highly recommend!',
    userName: 'John Doe',
  };

  test('renders headline correctly', () => {
    render(<ReviewComponent {...testProps} />);

    expect(screen.getByText(testProps.headline)).toBeInTheDocument();
  });

  test('renders rating correctly', () => {
    render(<ReviewComponent {...testProps} />);

    expect(screen.getByText(`Rating: ${testProps.rating}`)).toBeInTheDocument();
  });

  test('renders review text correctly', () => {
    render(<ReviewComponent {...testProps} />);

    expect(screen.getByText(testProps.review)).toBeInTheDocument();
  });

  test('renders user name correctly', () => {
    render(<ReviewComponent {...testProps} />);

    expect(screen.getByText(`- ${testProps.userName}`)).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const { asFragment } = render(<ReviewComponent {...testProps} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
