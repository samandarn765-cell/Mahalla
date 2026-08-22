import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { MahallaProvider, useMahalla } from '../context/MahallaContext';

const TestComponent = () => {
  const { 
    isAuthenticated, 
    userRole, 
    login, 
    logout, 
    requests, 
    addRequest, 
    toasts, 
    addToast 
  } = useMahalla();

  return (
    <div>
      <div data-testid="auth-status">{isAuthenticated ? 'logged-in' : 'logged-out'}</div>
      <div data-testid="user-role">{userRole || 'none'}</div>
      <div data-testid="requests-count">{requests.length}</div>
      <div data-testid="toasts-count">{toasts.length}</div>
      
      <button 
        data-testid="login-admin-btn"
        onClick={() => login('admin', { id: 'admin', password: 'admin123' })}
      >
        Login Admin
      </button>

      <button data-testid="logout-btn" onClick={logout}>
        Logout
      </button>

      <button 
        data-testid="add-toast-btn"
        onClick={() => addToast('Test notification', 'success')}
      >
        Add Toast
      </button>

      <button 
        data-testid="add-request-btn"
        onClick={() => addRequest({ title: 'Yangi quvur yorildi', category: 'Kommunal' })}
      >
        Add Request
      </button>
    </div>
  );
};

describe('MahallaContext State Management', () => {
  it('initializes with default values and supports login/logout workflow', async () => {
    render(
      <MahallaProvider>
        <TestComponent />
      </MahallaProvider>
    );

    expect(screen.getByTestId('auth-status').textContent).toBe('logged-out');

    // Perform login
    await act(async () => {
      screen.getByTestId('login-admin-btn').click();
    });

    expect(screen.getByTestId('auth-status').textContent).toBe('logged-in');
    expect(screen.getByTestId('user-role').textContent).toBe('admin');

    // Add toast
    act(() => {
      screen.getByTestId('add-toast-btn').click();
    });
    expect(Number(screen.getByTestId('toasts-count').textContent)).toBeGreaterThan(0);

    // Logout
    act(() => {
      screen.getByTestId('logout-btn').click();
    });
    expect(screen.getByTestId('auth-status').textContent).toBe('logged-out');
  });

  it('allows creating a new request dynamically', async () => {
    render(
      <MahallaProvider>
        <TestComponent />
      </MahallaProvider>
    );

    const initialCount = Number(screen.getByTestId('requests-count').textContent);

    await act(async () => {
      screen.getByTestId('add-request-btn').click();
    });

    const newCount = Number(screen.getByTestId('requests-count').textContent);
    expect(newCount).toBe(initialCount + 1);
  });
});
