import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import { TrainData } from '../../hooks/useTrainLocations';
import { selectMapInstance } from '../../store/features/map/mapSlice';
import { useAppSelector } from '../../store/hooks';
import { setActiveTrain } from '../../store/features/content/contentSlice';
import { useDispatch } from 'react-redux';
import StatusBadge from '../StatusBadge';

interface LiveTrackerList {
  items: TrainData[];
}

export default function LiveTrackerList({ items }: LiveTrackerList) {
  const listRef = useRef(null);
  const map = useAppSelector(selectMapInstance);
  const dispatch = useDispatch();
  const onClick = (item: TrainData) => {
    if (map) {
      dispatch(setActiveTrain(item.id));
      map.flyTo({ center: [item.lat, item.lng], essential: true, zoom: 12 });
    }
  };
  const virtualizer = useVirtualizer({
    count: items.length || 20,
    getScrollElement: () => listRef.current,
    estimateSize: () => 155,
    overscan: 2,
  });
  const vItems = virtualizer.getVirtualItems();
  return (
    <>
      <div className="border-b border-b-gray-200 px-3 pb-2">
        <h2>Live tracking</h2>
        <p>
          {items.length} {items.length === 1 ? 'train' : 'trains'} on the tracks
        </p>
      </div>
      {items.length === 0 ? (
        <div>No trains are currently running</div>
      ) : (
        <>
          <div ref={listRef} className="overflow-auto w-full h-[625px]">
            <div
              style={{
                height: `${virtualizer.getTotalSize()}px`,
                width: '100%',
                position: 'relative',
              }}
            >
              {vItems.map((vItem) => (
                <div
                  data-testid={`vitem-${vItem.index}`}
                  onClick={() => onClick(items[vItem.index])}
                  ref={virtualizer.measureElement}
                  key={vItem.key}
                  style={{ height: `${items[vItem.index]}px`, transform: `translateY(${vItem.start}px)` }}
                  className="px-3 py-12 border-b-gray-200 border-b hover:bg-gray-100 cursor-pointer absolute top-0 left-0 w-full"
                >
                  <div className="flex justify-between items-center">
                    <p className="text-md">#{items[vItem.index].id}</p>
                    <StatusBadge status={items[vItem.index].status} />
                  </div>
                  <div className="text-xs text-gray-700 mt-1">
                    <p>From: {items[vItem.index].journey.from}</p>
                    <p>To: {items[vItem.index].journey.to}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
