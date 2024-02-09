import classNames from 'classnames';
import { TrainStatus } from '../../hooks/useTrainLocations';

interface StatusBadgeProps {
  status: TrainStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={classNames('text-xs me-1 px-2 py-0.5 rounded', {
        'bg-green-200 text-green-700': status === TrainStatus.NORMAL,
        'bg-orange-200 text-orange-700': status === TrainStatus.DELAYED,
        'bg-red-200 text-red-700': status === TrainStatus.BROKEN,
      })}
    >
      {status === TrainStatus.NORMAL ? 'On time' : status === TrainStatus.DELAYED ? 'Delayed' : 'Fault'}
    </span>
  );
}
