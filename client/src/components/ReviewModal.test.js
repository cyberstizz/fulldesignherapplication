// src/components/ReviewModal.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ReviewModal from './ReviewModal';

describe('ReviewModal', () => {
  const testProps = {
    isOpen: true,
    onClose: jest.fn(),
    userId: 1,
    productId: 1,
    productType: 'test-product',
  };

  const renderComponent = (props = {}) => {
    return render(<ReviewModal {...testProps} {...props} />);
  };

  test('renders the modal when isOpen is true', () => {
    renderComponent();

    expect(screen.getByText('Headline')).toBeInTheDocument();
    expect(screen.getByText('Rating')).toBeInTheDocument();
    expect(screen.getByText('Review')).toBeInTheDocument();
    expect(screen.getByText('Submit Review')).toBeInTheDocument();
  });

  test('does not render the modal when isOpen is false', () => {
    renderComponent({ isOpen: false });

    expect(screen.queryByText('Headline')).not.toBeInTheDocument();
    expect(screen.queryByText('Rating')).not.toBeInTheDocument();
    expect(screen.queryByText('Review')).not.toBeInTheDocument();
    expect(screen.queryByText('Submit Review')).not.toBeInTheDocument();
  });

  test('calls onClose when clicking outside the modal', () => {
    renderComponent();

    fireEvent.click(screen.getByRole('presentation'));
    expect(testProps.onClose).toHaveBeenCalled();
  });

  test('does not call onClose when clicking inside the modal', () => {
    renderComponent();

    fireEvent.click(screen.getByRole('dialog'));
    expect(testProps.onClose).not.toHaveBeenCalled();
  });

  test('updates headline value on change', () => {
    renderComponent();

    const input = screen.getByLabelText('Headline');
    fireEvent.change(input, { target: { value: 'New Headline' } });

    expect(input.value).toBe('New Headline');
  });

  test('updates rating value on change', () => {
    renderComponent();

    const radio = screen.getByLabelText('Rating');
    fireEvent.click(radio);

    expect(radio.checked).toBe(true);
  });

  test('updates review value on change', () => {
    renderComponent();

    const textarea = screen.getByLabelText('Review');
    fireEvent.change(textarea, { target: { value: 'This is a review.' } });

    expect(textarea.value).toBe('This is a review.');
  });

  test('calls handleSubmit on form submission', () => {
    renderComponent();

    const form = screen.getByRole('form');
    fireEvent.submit(form);

    expect(screen.getByText('Submitting review:')).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const { asFragment } = renderComponent();

    expect(asFragment()).toMatchSnapshot();
  });
});
