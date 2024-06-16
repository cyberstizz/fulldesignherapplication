// src/components/PrivacyPolicy.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import PrivacyPolicy from './PrivacyPolicy';

describe('PrivacyPolicy Component', () => {
  test('renders privacy policy page text', () => {
    render(<PrivacyPolicy />);
    expect(screen.getByText('this is the privacy policy page')).toBeInTheDocument();
  });
});
