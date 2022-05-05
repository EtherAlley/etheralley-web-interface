import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { Providers } from '../Providers';

export function customRender(ui: React.ReactElement, options?: Omit<RenderOptions, 'queries'>): RenderResult {
  return render(ui, { wrapper: Providers, ...options });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
