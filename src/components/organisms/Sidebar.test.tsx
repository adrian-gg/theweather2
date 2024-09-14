import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { CITIES } from '../../config/consts';
import Sidebar from './Sidebar';

vi.mock('../atoms/Accordion', () => ({
  default: ({
    label,
    children,
  }: {
    label: React.ReactNode;
    children: React.ReactNode;
  }) => (
    <div>
      <div>{label}</div>
      <div>{children}</div>
    </div>
  ),
}));

vi.mock('../atoms/Anchor', () => ({
  default: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  ),
}));

vi.mock('../molecules/AnimateTextEffect', () => ({
  default: ({ text }: { text: string }) => <span>{text}</span>,
}));

vi.mock('../molecules/Settings', () => ({
  default: () => <div>Settings Component</div>,
}));

vi.mock('./Form', () => ({
  default: () => <form>Contact Form</form>,
}));

describe('Sidebar [Component]', () => {
  test('renders the logo correctly', () => {
    render(
      <Sidebar
        currentCity="New York"
        setCurrentCity={vi.fn()}
        setIsSidebarOpen={vi.fn()}
      />
    );

    expect(screen.getByText('theweather')).toBeInTheDocument();
  });

  test('renders the list of cities correctly', () => {
    render(
      <Sidebar
        currentCity="New York"
        setCurrentCity={vi.fn()}
        setIsSidebarOpen={vi.fn()}
      />
    );

    const cities = CITIES;
    cities.forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });
  });

  test('calls setCurrentCity and setIsSidebarOpen when a city is clicked', () => {
    const mockSetCurrentCity = vi.fn();
    const mockSetIsSidebarOpen = vi.fn();

    render(
      <Sidebar
        currentCity="New York"
        setCurrentCity={mockSetCurrentCity}
        setIsSidebarOpen={mockSetIsSidebarOpen}
      />
    );

    fireEvent.click(screen.getByText('Tokyo'));

    expect(mockSetCurrentCity).toHaveBeenCalledWith('Tokyo');
    expect(mockSetIsSidebarOpen).toHaveBeenCalledWith(false);
  });

  test('renders the contact form inside the contact accordion', () => {
    render(
      <Sidebar
        currentCity="New York"
        setCurrentCity={vi.fn()}
        setIsSidebarOpen={vi.fn()}
      />
    );

    expect(screen.getByText('Contact Form')).toBeInTheDocument();
  });

  test('renders the settings inside the settings accordion', () => {
    render(
      <Sidebar
        currentCity="New York"
        setCurrentCity={vi.fn()}
        setIsSidebarOpen={vi.fn()}
      />
    );

    expect(screen.getByText('Settings Component')).toBeInTheDocument();
  });
});
