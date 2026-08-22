import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MahallaProvider } from '../context/MahallaContext';
import { SOSButton } from '../components/common/SOSButton';

describe('SOS Emergency Button Component', () => {
  it('renders floating SOS trigger and expands emergency contact list on click', async () => {
    render(
      <MahallaProvider>
        <SOSButton />
      </MahallaProvider>
    );

    const sosButton = screen.getByLabelText(/Favqulodda SOS xizmatlarini ochish/i);
    expect(sosButton).toBeInTheDocument();

    // Initially modal/list is not open
    expect(screen.queryByText(/Favqulodda Yordam \(SOS\)/i)).not.toBeInTheDocument();

    // Click SOS button
    await act(async () => {
      fireEvent.click(sosButton);
    });

    // List should appear with 103, 102, 101, 104 emergency numbers
    expect(screen.getByText(/Favqulodda Yordam \(SOS\)/i)).toBeInTheDocument();
    expect(screen.getByText(/103/i)).toBeInTheDocument();
  });
});
