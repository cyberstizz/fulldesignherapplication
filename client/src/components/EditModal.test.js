import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditModal from './EditModal';

describe('EditModal', () => {
  const product = {
    name: 'Test Product',
    image: '',
    description: 'Test Description',
    productType: 'crocs',
    productPrice: 100,
  };

  const mockOnUpdate = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnUpdate.mockClear();
    mockOnClose.mockClear();
  });

  test('renders the modal with product details', () => {
    render(<EditModal isOpen={true} onClose={mockOnClose} product={product} onUpdate={mockOnUpdate} />);

    expect(screen.getByLabelText(/name/i)).toHaveValue(product.name);
    expect(screen.getByLabelText(/description/i)).toHaveValue(product.description);
    expect(screen.getByLabelText(/product type/i)).toHaveValue(product.productType);
    expect(screen.getByLabelText(/product price/i)).toHaveValue(product.productPrice);
  });

  test('calls onUpdate with updated product details and closes the modal', () => {
    render(<EditModal isOpen={true} onClose={mockOnClose} product={product} onUpdate={mockOnUpdate} />);

    const updatedName = 'Updated Product';
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: updatedName } });

    fireEvent.click(screen.getByText(/update/i));

    expect(mockOnUpdate).toHaveBeenCalledWith({
      ...product,
      name: updatedName,
    });
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('calls onClose without updating the product', () => {
    render(<EditModal isOpen={true} onClose={mockOnClose} product={product} onUpdate={mockOnUpdate} />);

    fireEvent.click(screen.getByText(/cancel/i));

    expect(mockOnUpdate).not.toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('updates the product image on file selection', () => {
    const file = new File(['dummy content'], 'example.png', { type: 'image/png' });

    render(<EditModal isOpen={true} onClose={mockOnClose} product={product} onUpdate={mockOnUpdate} />);

    const fileInput = screen.getByLabelText(/image/i);
    fireEvent.change(fileInput, { target: { files: [file] } });

    const reader = new FileReader();
    reader.onloadend = () => {
      expect(fileInput.files[0]).toBe(file);
    };
    reader.readAsDataURL(file);
  });

  test('updates the product description', () => {
    const updatedDescription = 'Updated Description';
    render(<EditModal isOpen={true} onClose={mockOnClose} product={product} onUpdate={mockOnUpdate} />);

    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: updatedDescription } });

    fireEvent.click(screen.getByText(/update/i));

    expect(mockOnUpdate).toHaveBeenCalledWith({
      ...product,
      description: updatedDescription,
    });
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('updates the product type', () => {
    const updatedProductType = 'jackets';
    render(<EditModal isOpen={true} onClose={mockOnClose} product={product} onUpdate={mockOnUpdate} />);

    fireEvent.change(screen.getByLabelText(/product type/i), { target: { value: updatedProductType } });

    fireEvent.click(screen.getByText(/update/i));

    expect(mockOnUpdate).toHaveBeenCalledWith({
      ...product,
      productType: updatedProductType,
    });
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('updates the product price', () => {
    const updatedProductPrice = 200;
    render(<EditModal isOpen={true} onClose={mockOnClose} product={product} onUpdate={mockOnUpdate} />);

    fireEvent.change(screen.getByLabelText(/product price/i), { target: { value: updatedProductPrice } });

    fireEvent.click(screen.getByText(/update/i));

    expect(mockOnUpdate).toHaveBeenCalledWith({
      ...product,
      productPrice: updatedProductPrice,
    });
    expect(mockOnClose).toHaveBeenCalled();
  });
});
