import { fireEvent, screen, waitFor } from '@testing-library/react';
import Sidebar from '../components/Sidebar';
import { renderWithProviders } from './renderProviders';

describe('Sidebar', () => {
  it('renders Sidebar & content', async () => {
    renderWithProviders(<Sidebar />);
    const sidebar = screen.getByTestId('sidebar');
    expect(sidebar).toBeInTheDocument();

    const liveTrackingMenuItem = screen.getByTestId('sidebar-item-0');
    const reportsMenuItem = screen.getByTestId('sidebar-item-1');
    expect(liveTrackingMenuItem).toBeInTheDocument();
    expect(reportsMenuItem).toBeInTheDocument();

    // click on menu items and check correct content is rendered
    fireEvent.click(liveTrackingMenuItem);
    const content = screen.getByTestId('sidebar-content');
    expect(content).toBeInTheDocument();
    waitFor(() => expect(content).toContain(screen.getByText(/Live tracking/)));
    fireEvent.click(reportsMenuItem);
    waitFor(() => expect(content).toContain(screen.getByText(/Reports/)));
    fireEvent.click(reportsMenuItem);
    expect(content).not.toBeInTheDocument();
  });
});
