import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Register from '../Register';

test('renders Register form with heading and button', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  
  render(
    <QueryClientProvider client={queryClient}>
      <Register />
    </QueryClientProvider>
  );
  
  expect(screen.getByRole('heading', { name: /Create Account/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
});
