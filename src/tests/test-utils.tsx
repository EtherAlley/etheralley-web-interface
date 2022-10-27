import { cleanup, render, RenderOptions, RenderResult } from '@testing-library/react';
import { Providers } from '../Providers';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});

export function customRender(ui: React.ReactElement, options?: Omit<RenderOptions, 'queries'>): RenderResult {
  return render(ui, { wrapper: Providers, ...options });
}

// re-export everything
export * from '@testing-library/react';

export { default as userEvent } from '@testing-library/user-event';

// override render method
export { customRender as render };
