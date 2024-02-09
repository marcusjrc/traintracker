import Map from '../../components/Map';
import Sidebar from '../../components/Sidebar';
import useTrainLocations from '../../hooks/useTrainLocations';

export default function Dashboard() {
  const { isLoading, isSuccess, isError, data } = useTrainLocations();
  return (
    <div className="flex items-center justify-center h-screen">
      {isLoading && <div className="text-lg italic">Loading Train Tracker...</div>}
      {isError && <div className="text-lg italic">Oops, there was an error loading Train Tracker</div>}
      {isSuccess && (
        <>
          <Sidebar />
          <Map markers={data}></Map>
        </>
      )}
    </div>
  );
}
