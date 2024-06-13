import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateModal from './CreateModal';

describe('CreateModal', () => {
  const mockOnClose = jest.fn();
  const mockOnCreate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly when open', () => {
    render(<CreateModal isOpen={true} onClose={mockOnClose} onCreate={mockOnCreate} />);

    expect(screen.getByText('Create Product')).toBeInTheDocument();
    expect(screen.getByLabelText('Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Image:')).toBeInTheDocument();
    expect(screen.getByLabelText('Description:')).toBeInTheDocument();
    expect(screen.getByLabelText('Product Type:')).toBeInTheDocument();
    expect(screen.getByLabelText('Price:')).toBeInTheDocument();
    expect(screen.getByText('Create')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  test('does not render when closed', () => {
    render(<CreateModal isOpen={false} onClose={mockOnClose} onCreate={mockOnCreate} />);

    expect(screen.queryByText('Create Product')).not.toBeInTheDocument();
  });

  test('handles input changes correctly', () => {
    render(<CreateModal isOpen={true} onClose={mockOnClose} onCreate={mockOnCreate} />);

    const nameInput = screen.getByLabelText('Name:');
    const descriptionInput = screen.getByLabelText('Description:');
    const priceInput = screen.getByLabelText('Price:');
    const productTypeSelect = screen.getByLabelText('Product Type:');

    fireEvent.change(nameInput, { target: { value: 'New Product' } });
    fireEvent.change(descriptionInput, { target: { value: 'New Description' } });
    fireEvent.change(priceInput, { target: { value: '99.99' } });
    fireEvent.change(productTypeSelect, { target: { value: 'sneakers' } });

    expect(nameInput.value).toBe('New Product');
    expect(descriptionInput.value).toBe('New Description');
    expect(priceInput.value).toBe('99.99');
    expect(productTypeSelect.value).toBe('sneakers');
  });

  test('handles image change correctly', () => {
    render(<CreateModal isOpen={true} onClose={mockOnClose} onCreate={mockOnCreate} />);

    const imageInput = screen.getByLabelText('Image:');
    const file = new File(['dummy content'], 'example.png', { type: 'image/png' });

    fireEvent.change(imageInput, { target: { files: [file] } });

    expect(imageInput.files[0]).toBe(file);
    expect(imageInput.files.item(0)).toBe(file);
    expect(imageInput.files).toHaveLength(1);
  });

  test('calls onCreate with correct data', async () => {
    render(<CreateModal isOpen={true} onClose={mockOnClose} onCreate={mockOnCreate} />);

    const nameInput = screen.getByLabelText('Name:');
    const descriptionInput = screen.getByLabelText('Description:');
    const priceInput = screen.getByLabelText('Price:');
    const productTypeSelect = screen.getByLabelText('Product Type:');
    const imageInput = screen.getByLabelText('Image:');
    const file = new File(['dummy content'], 'example.png', { type: 'image/png' });

    fireEvent.change(nameInput, { target: { value: 'New Product' } });
    fireEvent.change(descriptionInput, { target: { value: 'New Description' } });
    fireEvent.change(priceInput, { target: { value: '99.99' } });
    fireEvent.change(productTypeSelect, { target: { value: 'sneakers' } });
    fireEvent.change(imageInput, { target: { files: [file] } });

    fireEvent.click(screen.getByText('Create'));

    await waitFor(() => {
      expect(mockOnCreate).toHaveBeenCalledWith({
        name: 'New Product',
        image: file,
        description: 'New Description',
        productType: 'sneakers',
        price: '99.99',
      });
    });
  });

  test('calls onClose when Cancel button is clicked', () => {
    render(<CreateModal isOpen={true} onClose={mockOnClose} onCreate={mockOnCreate} />);

    fireEvent.click(screen.getByText('Cancel'));

    expect(mockOnClose).toHaveBeenCalled();
  });
});
