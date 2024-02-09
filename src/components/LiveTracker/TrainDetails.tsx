import classNames from 'classnames';
import { TrainData } from '../../hooks/useTrainLocations';
import StatusBadge from '../StatusBadge';
import { formatDuration, intervalToDuration } from 'date-fns';
import { useMemo } from 'react';

interface TrainDetailsProps {
  data: TrainData;
  goBack?: () => void;
}

export default function TrainDetails({ data: { status, id, journey }, goBack }: TrainDetailsProps) {
  const etaString = useMemo(
    () =>
      formatDuration(
        intervalToDuration({
          start: new Date(),
          end: journey.eta,
        }),
        { format: ['hours', 'minutes'] },
      ),
    [journey.eta],
  );

  return (
    <div className="py-3">
      <div className={classNames('flex items-center px-5', { 'justify-between': goBack, 'justify-end': !goBack })}>
        {goBack && (
          <button data-testid="goBack" onClick={goBack}>
            Go back ←
          </button>
        )}
        <div className="flex items-center justify-self-end">
          <StatusBadge status={status}></StatusBadge>
        </div>
      </div>
      <div className="mt-5 px-5">
        <h4 className="font-bold"> #{id}</h4>
      </div>
      <div className="mt-1 border-b pb-5">
        <div className="px-5">
          <p>From: {journey.from}</p>
          <p>To: {journey.to}</p>
          <p>ETA: {etaString}</p>
        </div>
      </div>
    </div>
  );
}
