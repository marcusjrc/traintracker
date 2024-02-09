import { addHours, addMinutes } from 'date-fns';
import { TrainData, TrainStatus } from '../../hooks/useTrainLocations';

export const trains: TrainData[] = [
  {
    id: 'BVZPMOOI',
    lat: -1.57991,
    lng: 53.79987,
    status: TrainStatus.NORMAL,
    journey: {
      from: 'Manchester',
      to: 'Leeds',
      eta: addHours(addMinutes(new Date(), 10), 0),
    },
  },
  {
    id: 'VCVQVBWR',
    lat: -1.509622116417063,
    lng: 55.036557695836905,
    status: TrainStatus.NORMAL,
    journey: {
      from: 'Newcastle',
      to: 'Edinburgh',
      eta: addHours(addMinutes(new Date(), 50), 1),
    },
  },
  {
    id: 'QTYPFTNN',
    lat: -0.23847191786023814,
    lng: 52.48693345402913,
    status: TrainStatus.BROKEN,
    journey: {
      from: 'Edinburgh',
      to: 'London',
      eta: addHours(addMinutes(new Date(), 35), 0),
    },
  },
  {
    id: 'KVSFWRYT',
    lat: -0.6221458126328798,
    lng: 51.38973802143326,
    status: TrainStatus.NORMAL,
    journey: {
      from: 'London',
      to: 'Plymouth',
      eta: addHours(addMinutes(new Date(), 40), 1),
    },
  },
  {
    id: 'JWOXFXQJ',
    lat: -3.3326076447392836,
    lng: 51.640701112358386,
    status: TrainStatus.NORMAL,
    journey: {
      from: 'Cardiff',
      to: 'Aberystwyth',
      eta: addHours(addMinutes(new Date(), 9), 3),
    },
  },
  {
    id: 'OOQKILBT',
    lat: -2.707410950260396,
    lng: 54.75467743562737,
    status: TrainStatus.DELAYED,
    journey: {
      from: 'Carlisle',
      to: 'Manchester',
      eta: addHours(addMinutes(new Date(), 30), 2),
    },
  },
];
