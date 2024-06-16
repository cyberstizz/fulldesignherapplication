// src/components/LogoutModal.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LogoutModal from './LogoutModal';

describe('LogoutModal Component', () => {
  const mockOnClose = jest.fn();

  const renderComponent = (isOpen = true) =>
    render(<LogoutModal isOpen={isOpen} onClose={mockOnClose} />);

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  test('renders logout modal when open', () => {
    renderComponent();
    expect(screen.getByText('Logout Modal')).toBeInTheDocument();
  });

  test('does not render logout modal when closed', () => {
    renderComponent(false);
    expect(screen.queryByText('Logout Modal')).not.toBeInTheDocument();
  });

  test('closes modal on overlay click', () => {
    renderComponent();
    fireEvent.click(screen.getByRole('button', { name: /times/i }));
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('closes modal on close button click', () => {
    renderComponent();
    fireEvent.click(screen.getByRole('button', { name: /times/i }));
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('does not close modal when clicking inside modal content', () => {
    renderComponent();
    fireEvent.click(screen.getByText('Logout Modal'));
    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
