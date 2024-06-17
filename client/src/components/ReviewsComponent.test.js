// src/components/ReviewsComponent.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import ReviewsComponent from './ReviewsComponent';

jest.mock('axios');

const renderComponent = () => {
  return render(
    <BrowserRouter>
      <ReviewsComponent />
    </BrowserRouter>
  );
};

describe('ReviewsComponent', () => {
  const mockReviews = [
    {
      headline: 'Great product!',
      rating: 5,
      review: 'I love this product. Highly recommend!',
      userName: 'User1',
    },
    {
      headline: 'Not bad',
      rating: 3,
      review: 'It is okay, could be better.',
      userName: 'User2',
    },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: {
        reviews: mockReviews,
        averageRating: 4,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    renderComponent();
  });

  test('displays the average rating correctly', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Average Rating: 4')).toBeInTheDocument();
    });
  });

  test('displays reviews when they are available', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Great product!')).toBeInTheDocument();
      expect(screen.getByText('I love this product. Highly recommend!')).toBeInTheDocument();
      expect(screen.getByText('User1')).toBeInTheDocument();

      expect(screen.getByText('Not bad')).toBeInTheDocument();
      expect(screen.getByText('It is okay, could be better.')).toBeInTheDocument();
      expect(screen.getByText('User2')).toBeInTheDocument();
    });
  });

  test('displays a message when there are no reviews', async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        reviews: [],
        averageRating: null,
      },
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('No reviews yet.')).toBeInTheDocument();
    });
  });

  test('matches snapshot', async () => {
    const { asFragment } = renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Average Rating: 4')).toBeInTheDocument();
    });

    expect(asFragment()).toMatchSnapshot();
  });

  test('handles errors gracefully', async () => {
    axios.get.mockRejectedValueOnce(new Error('Error fetching reviews'));

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('No reviews yet.')).toBeInTheDocument();
    });

    // Optionally, you could check console.error mock if you want to ensure the error is logged
  });
});
