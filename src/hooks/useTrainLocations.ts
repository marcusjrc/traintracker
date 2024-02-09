import { useQuery } from 'react-query';
import { Routes, apiClient } from '../api/client';

export enum TrainStatus {
  NORMAL = 'Normal',
  DELAYED = 'Delayed',
  BROKEN = 'Broken',
}

export interface TrainData {
  id: string;
  lng: number;
  lat: number;
  status: TrainStatus;
  currentSpeed: number;
  journey: {
    from: string;
    to: string;
    eta: Date;
  };
}

export default function useTrainLocations() {
  return useQuery('trains', () => apiClient.get<TrainData[]>(Routes.trains).then((d) => d.data), {
    refetchOnWindowFocus: false,
  });
}
