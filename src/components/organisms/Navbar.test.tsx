import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import Navbar from './Navbar';

// Mock de LanguageMenu
vi.mock('../molecules/LanguageMenu', () => ({
  default: () => <div>Language Menu</div>,
}));

describe('Navbar [Component]', () => {
  test('renders correctly with the menu icon', () => {
    render(<Navbar isSidebarOpen={false} setIsSidebarOpen={vi.fn()} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    const svg = button.querySelector('svg'); // <IoMdMenu />
    expect(svg).toBeInTheDocument();

    const path = svg?.querySelector('path')?.getAttribute('d');
    expect(path).toBe(
      'M64 384h384v-42.666H64V384zm0-106.666h384v-42.667H64v42.667zM64 128v42.665h384V128H64z'
    );

    expect(screen.getByText('Language Menu')).toBeInTheDocument();
  });

  test('renders correctly with the close icon when sidebar is open', () => {
    render(<Navbar isSidebarOpen setIsSidebarOpen={vi.fn()} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    const svg = button.querySelector('svg'); // <IoMdClose />
    expect(svg).toBeInTheDocument();
    const path = svg?.querySelector('path')?.getAttribute('d');
    expect(path).toBe(
      'M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z'
    );
    expect(screen.getByText('Language Menu')).toBeInTheDocument();
  });
});
