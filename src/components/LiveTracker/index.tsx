import { useAppSelector } from '../../store/hooks';
import { selectActiveTrain, setActiveTrain } from '../../store/features/content/contentSlice';
import TrainDetails from './TrainDetails';
import LiveTrackerList from './LiveTrackerList';
import useTrainLocations from '../../hooks/useTrainLocations';
import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

export default function LiveTracker() {
  const { isError, isLoading, data } = useTrainLocations();
  const activeTrain = useAppSelector(selectActiveTrain);
  const dispatch = useDispatch();

  const activeTrainData = useMemo(
    () => (activeTrain && data ? data.find((i) => i.id === activeTrain) : undefined),
    [activeTrain, data],
  );

  const goBack = useCallback(() => {
    dispatch(setActiveTrain(undefined));
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError || !data) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="h-full">
      {activeTrain && activeTrainData && <TrainDetails goBack={goBack} data={activeTrainData} />}
      {!activeTrain && <LiveTrackerList items={data} />}
    </div>
  );
}
