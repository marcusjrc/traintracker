import { render, screen } from '@testing-library/react';
import TrainDetails from '../components/LiveTracker/TrainDetails';
import { trains } from '../mocks/data/trains';

describe('Train Details Component', () => {
  it('renders Train Details with correct info', async () => {
    render(<TrainDetails data={trains[0]} />);
    expect(screen.getByText('#' + trains[0].id)).toBeInTheDocument();
    expect(screen.getByText('On time')).toBeInTheDocument();
    expect(screen.getByText('From: ' + trains[0].journey.from)).toBeInTheDocument();
    expect(screen.getByText('To: ' + trains[0].journey.to)).toBeInTheDocument();
  });
  it('correctly shows optional back button when goBack provided', async () => {
    const { rerender } = render(<TrainDetails data={trains[0]} />);
    expect(screen.queryByTestId('goBack')).not.toBeInTheDocument();
    rerender(<TrainDetails data={trains[0]} goBack={() => undefined} />);
    const goBack = screen.queryByTestId('goBack');
    expect(goBack).toBeInTheDocument();
  });
  it('shows correct eta string', async () => {
    const { rerender } = render(<TrainDetails data={trains[0]} />);
    expect(screen.queryByText(/hour/)).not.toBeInTheDocument();
    expect(screen.getByText(/9 minutes/)).toBeInTheDocument();
    rerender(<TrainDetails data={trains[1]} />);
    expect(screen.getByText(/1 hour/)).toBeInTheDocument();
    expect(screen.getByText(/49 minute/)).toBeInTheDocument();
  });
});
