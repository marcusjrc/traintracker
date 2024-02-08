import Map from '../../components/Map';
import useTrainLocations from '../../hooks/useTrainLocations';

export default function Dashboard() {
  const { isLoading, isSuccess, isError, data } = useTrainLocations();

  return (
    <div>
      {isLoading && <div>Loading Train Tracker...</div>}
      {isError && <div>Oops, there was an error loading Train Tracker</div>}
      {isSuccess && <Map markers={data}></Map>}
    </div>
  );
}
