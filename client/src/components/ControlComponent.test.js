import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import ControlComponent from './ControlComponent';

jest.mock('axios');
jest.mock('./EditModal', () => ({ isOpen, onClose, product, onUpdate }) => (
  isOpen ? (
    <div data-testid="edit-modal">
      <button onClick={() => onClose()}>Close Edit Modal</button>
      <button onClick={() => onUpdate(product)}>Update</button>
    </div>
  ) : null
));
jest.mock('./DeleteModal', () => ({ isOpen, onClose, productName, onDelete }) => (
  isOpen ? (
    <div data-testid="delete-modal">
      <button onClick={() => onClose()}>Close Delete Modal</button>
      <button onClick={() => onDelete()}>Delete</button>
    </div>
  ) : null
));

describe('ControlComponent', () => {
  const mockProps = {
    name: 'Test Product',
    path: '/test.jpg',
    product_price: 19.99,
    product_id: 1,
    product_type: 'test-type',
    onImageLoad: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with product information', () => {
    render(
      <MemoryRouter>
        <ControlComponent {...mockProps} />
      </MemoryRouter>
    );
    expect(screen.getByText(mockProps.name)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /pants/i })).toBeInTheDocument();
  });

  test('opens and closes EditModal', async () => {
    render(
      <MemoryRouter>
        <ControlComponent {...mockProps} />
      </MemoryRouter>
    );

    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    await waitFor(() => {
      expect(screen.getByTestId('edit-modal')).toBeInTheDocument();
    });

    const closeButton = screen.getByText('Close Edit Modal');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByTestId('edit-modal')).not.toBeInTheDocument();
    });
  });

  test('opens and closes DeleteModal', async () => {
    render(
      <MemoryRouter>
        <ControlComponent {...mockProps} />
      </MemoryRouter>
    );

    const deleteButton = screen.getByText('delete');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.getByTestId('delete-modal')).toBeInTheDocument();
    });

    const closeButton = screen.getByText('Close Delete Modal');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByTestId('delete-modal')).not.toBeInTheDocument();
    });
  });

  test('handles edit action', async () => {
    const editedProduct = { ...mockProps, name: 'Updated Product' };
    axios.put.mockResolvedValue({ status: 200, data: editedProduct });

    render(
      <MemoryRouter>
        <ControlComponent {...mockProps} />
      </MemoryRouter>
    );

    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    await waitFor(() => {
      expect(screen.getByTestId('edit-modal')).toBeInTheDocument();
    });

    const updateButton = screen.getByText('Update');
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(expect.stringContaining(mockProps.product_type), expect.any(FormData), expect.any(Object));
      expect(screen.queryByTestId('edit-modal')).not.toBeInTheDocument();
    });
  });

  test('handles delete action', async () => {
    axios.delete.mockResolvedValue({ status: 200 });

    render(
      <MemoryRouter>
        <ControlComponent {...mockProps} />
      </MemoryRouter>
    );

    const deleteButton = screen.getByText('delete');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.getByTestId('delete-modal')).toBeInTheDocument();
    });

    const deleteConfirmButton = screen.getByText('Delete');
    fireEvent.click(deleteConfirmButton);

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(expect.stringContaining(mockProps.product_type));
      expect(screen.queryByTestId('delete-modal')).not.toBeInTheDocument();
    });
  });
});
