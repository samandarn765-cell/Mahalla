import { describe, it, expect, beforeEach } from 'vitest';
import { apiService } from '../services/api';

describe('Smart Mahalla Authentication & Security', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('authenticates admin with valid credentials', async () => {
    const res = await apiService.login('admin', { id: 'admin', password: 'admin123' });
    expect(res.success).toBe(true);
    expect(res.token).toBeDefined();
    expect(res.user.role).toBe('admin');
  });

  it('rejects admin with invalid password', async () => {
    const res = await apiService.login('admin', { id: 'admin', password: 'wrongpassword' });
    expect(res.success).toBe(false);
    expect(res.error).toBeDefined();
  });

  it('authenticates resident with complete info', async () => {
    const res = await apiService.login('resident', {
      name: 'Jasur Olimov',
      phone: '+998901234567',
      mahalla: 'Navoiy Mahallasi',
      address: '15-uy'
    });
    expect(res.success).toBe(true);
    expect(res.user.name).toBe('Jasur Olimov');
    expect(res.user.role).toBe('resident');
  });

  it('rejects resident with missing fields', async () => {
    const res = await apiService.login('resident', { name: '', phone: '' });
    expect(res.success).toBe(false);
  });
});
