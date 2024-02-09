import { screen } from '@testing-library/react';
import { trains } from '../mocks/data/trains';
import LiveTrackerList from '../components/LiveTracker/LiveTrackerList';
import { renderWithProviders } from './renderProviders';

describe('LiveTrackerList  Component', () => {
  it('renders LiveTrackerList with list items', async () => {
    renderWithProviders(<LiveTrackerList items={trains} />);
    expect(screen.getByText(/Live tracking/)).toBeInTheDocument();
    expect(screen.getByText(/6 trains/)).toBeInTheDocument();
  });
  it('renders empty list state when no items provided', async () => {
    renderWithProviders(<LiveTrackerList items={[]} />);
    expect(screen.getByText(/No trains are currently running/)).toBeInTheDocument;
  });
});
