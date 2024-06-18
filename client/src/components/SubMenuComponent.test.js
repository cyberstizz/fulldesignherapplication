import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SubMenuComponent from '../SubMenuComponent';

describe('SubMenuComponent', () => {
  const mockProps = {
    onImageLoad: jest.fn(),
    path: '/path/to/image.jpg',
    name: 'Test Product',
    product_price: 99.99,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders SubMenuComponent with correct props', () => {
    render(<SubMenuComponent {...mockProps} />);

    // Check if product image is rendered with correct src
    const productImage = screen.getByAltText('pants');
    expect(productImage).toBeInTheDocument();
    expect(productImage).toHaveAttribute('src', mockProps.path);

    // Check if product name is rendered
    expect(screen.getByText(mockProps.name)).toBeInTheDocument();

    // Check if product price is rendered
    expect(screen.getByText(`$${mockProps.product_price}`)).toBeInTheDocument();

    // Check if cart icon is rendered
    const cartIcon = screen.getByAltText('cart icon');
    expect(cartIcon).toBeInTheDocument();
  });

  test('calls onImageLoad when image is loaded', () => {
    render(<SubMenuComponent {...mockProps} />);

    const productImage = screen.getByAltText('pants');
    fireEvent.load(productImage);

    expect(mockProps.onImageLoad).toHaveBeenCalled();
  });

  test('renders with correct styles', () => {
    const { container } = render(<SubMenuComponent {...mockProps} />);
    
    const productImage = container.querySelector('.productImage');
    const productRightSection = container.querySelector('.productRightSection');
    const submenuTitle = container.querySelector('.submenuTitle');
    const productPrice = container.querySelector('.productPrice');
    const cartIcon = container.querySelector('img[alt="cart icon"]');

    expect(productImage).toHaveStyle({
      marginLeft: '-2%',
      border: 'solid 1px silver',
      borderLeft: '0',
    });
    expect(productRightSection).toHaveStyle({
      display: 'flex',
      flexDirection: 'column',
    });
    expect(cartIcon).toHaveStyle({
      marginTop: '30%',
      marginRight: '4%',
      objectFit: 'contain',
      overflow: 'hidden',
    });
  });
});
