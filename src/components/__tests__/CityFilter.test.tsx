import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CityFilter from '../Filter/CityFilter';
import { useStationsStore } from '../../store/useStationsStore';
import type { Station } from '../../types/station';

describe('CityFilter', () => {
  const mockStations: Station[] = [
    { id: 1, name: 'Berlin Hbf', city: 'Berlin', lat: 52.5251, lng: 13.3694 },
    { id: 2, name: 'Hamburg Hbf', city: 'Hamburg', lat: 53.553, lng: 10.0067 },
    { id: 3, name: 'Munich Hbf', city: 'Munich', lat: 48.1402, lng: 11.5586 },
  ];

  beforeEach(() => {
    useStationsStore.setState({
      stations: mockStations,
      filteredStations: mockStations,
      selectedCity: '',
      selectedStationId: null,
      isLoading: false,
      error: null,
    });
  });

  it('should render city filter dropdown', () => {
    render(<CityFilter />);

    expect(screen.getByLabelText(/filter by city/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('should display all cities in dropdown', () => {
    render(<CityFilter />);

    const select = screen.getByRole('combobox');
    const options = Array.from(select.querySelectorAll('option')).map(
      (option) => option.textContent
    );

    expect(options).toContain('All Cities');
    expect(options).toContain('Berlin');
    expect(options).toContain('Hamburg');
    expect(options).toContain('Munich');
  });

  it('should filter stations when city is selected', async () => {
    const user = userEvent.setup();
    const setSelectedCity = vi.fn();
    useStationsStore.setState({ setSelectedCity } as any);

    render(<CityFilter />);

    const select = screen.getByRole('combobox');
    await user.selectOptions(select, 'Berlin');

    expect(setSelectedCity).toHaveBeenCalledWith('Berlin');
  });

  it('should show clear button when city is selected', () => {
    useStationsStore.setState({ selectedCity: 'Berlin' });

    render(<CityFilter />);

    expect(screen.getByText(/clear/i)).toBeInTheDocument();
  });

  it('should not show clear button when no city is selected', () => {
    render(<CityFilter />);

    expect(screen.queryByText(/clear/i)).not.toBeInTheDocument();
  });

  it('should clear filter when clear button is clicked', async () => {
    const user = userEvent.setup();
    const clearFilter = vi.fn();
    useStationsStore.setState({ 
      selectedCity: 'Berlin',
      clearFilter 
    } as any);

    render(<CityFilter />);

    const clearButton = screen.getByText(/clear/i);
    await user.click(clearButton);

    expect(clearFilter).toHaveBeenCalled();
  });
});
