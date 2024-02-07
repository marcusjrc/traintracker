import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders hello world', () => {
    render(<App />);
    const text = screen.getByText(/Hello World/i);
    expect(text).toBeInTheDocument();
  });
});
