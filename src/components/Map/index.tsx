import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl, { ImageSource } from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoibWFyY3VzcmMiLCJhIjoiY2xzYnk2NThuMGppbTJsbzVtaDRxaGtjcSJ9.grFOKv65ZcBuS_JCvonH2A';
import { useEffect, useRef, useState } from 'react';
import { TrainData, TrainStatus } from '../../hooks/useTrainLocations';
import trainIcon from '../../assets/train.png';
import { useDispatch, useSelector } from 'react-redux';
import { selectMapInstance, setMapInstance } from '../../store/features/map/mapSlice';
import { green, orange, red } from '../../utils/colors';

const INITIAL_COORDINATES = [-2.36966957036279, 54.2379333607472];
const INITIAL_ZOOM = 5.2;

interface MapProps {
  markers: TrainData[];
}

export default function Map({ markers }: MapProps) {
  const mapContainer = useRef(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const mapObj = useSelector(selectMapInstance);
  const dispatch = useDispatch();
  const [lng, setLng] = useState(INITIAL_COORDINATES[0]);
  const [lat, setLat] = useState(INITIAL_COORDINATES[1]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);

  // initialise map container, user events & controls
  useEffect(() => {
    if (mapContainer.current === null || map.current !== null) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: { lat, lng },
      zoom: zoom,
    });
    if (!mapObj) {
      dispatch(setMapInstance(map.current));
    }
    map.current.on('move', () => {
      if (!map.current) return;
      setLng(map.current.getCenter().lng);
      setLat(map.current.getCenter().lat);
      setZoom(map.current.getZoom());
    });
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // initialize loading map images & layers
  useEffect(() => {
    if (map.current === null || mapLoaded) return;
    map.current.on('load', () => {
      if (!map.current) return;
      map.current.loadImage(trainIcon, (error, image) => {
        if (!map.current || !image || mapLoaded) return;
        if (error) throw error;
        map.current.addImage('train-marker', image, { sdf: true });
        map.current.addLayer({
          id: 'points',
          type: 'symbol',
          source: 'points',
          layout: {
            'icon-image': 'train-marker',
            'icon-size': 0.08,
          },
          paint: {
            'icon-color': [
              'match',
              ['get', 'status'],
              TrainStatus.NORMAL,
              green,
              TrainStatus.DELAYED,
              orange,
              TrainStatus.BROKEN,
              red,
              green,
            ],
          },
        });
      });
      setMapLoaded(true);
    });
  }, [mapLoaded]);

  // Set up markers or update already existing markers
  useEffect(() => {
    if (map.current === null || !mapLoaded) return;
    const source = map.current.getSource('points') as ImageSource;
    if (source) {
      source.setCoordinates(markers.map((mark) => [mark.lat, mark.lng]));
    } else {
      map.current.addSource('points', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: markers.map((marker) => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [marker.lat, marker.lng],
            },
            properties: {
              status: marker.status,
            },
          })),
        },
      });
    }
  }, [mapLoaded, markers]);

  return (
    <div className="h-screen w-screen">
      <div data-testid="map-container" ref={mapContainer} className="map-container" />
    </div>
  );
}
