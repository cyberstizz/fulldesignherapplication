import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dropdown from './Dropdown';

describe('Dropdown', () => {
  const title = 'Test Dropdown';
  const emptyMessage = 'No items available';
  const items = [
    { title: 'Item 1', content: 'Content 1' },
    { title: 'Item 2', content: 'Content 2' },
  ];

  test('renders title and closed state initially', () => {
    render(<Dropdown title={title} items={items} emptyMessage={emptyMessage} />);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText('▼')).toBeInTheDocument();
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Item 2')).not.toBeInTheDocument();
  });

  test('toggles dropdown open and close', () => {
    render(<Dropdown title={title} items={items} emptyMessage={emptyMessage} />);

    // Open dropdown
    fireEvent.click(screen.getByText(title));
    expect(screen.getByText('▲')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();

    // Close dropdown
    fireEvent.click(screen.getByText(title));
    expect(screen.getByText('▼')).toBeInTheDocument();
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Item 2')).not.toBeInTheDocument();
  });

  test('displays empty message when no items are provided', () => {
    render(<Dropdown title={title} items={[]} emptyMessage={emptyMessage} />);

    // Open dropdown
    fireEvent.click(screen.getByText(title));
    expect(screen.getByText(emptyMessage)).toBeInTheDocument();
  });
});
