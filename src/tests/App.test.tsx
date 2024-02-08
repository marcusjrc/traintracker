import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders hello world', async () => {
    render(<App />);
    const loadingText = screen.getByText(/Loading/);
    expect(loadingText).toBeInTheDocument();
    await waitFor(() => {
      const map = screen.queryByTestId('map-container');
      return expect(map).toBeInTheDocument();
    });
  });
});
