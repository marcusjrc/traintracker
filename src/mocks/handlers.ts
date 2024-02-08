import { HttpResponse, http } from 'msw';
import { BASE_URL, Routes } from '../api/client';
import { TrainStatus } from '../hooks/useTrainLocations';

const url = (url: string) => BASE_URL + url;

export const handlers = [
  http.get(url(Routes.trains), () => {
    return HttpResponse.json(
      Array.from([
        {
          id: '17f740bd-1a5f-45be-b304-de9cb0e00271',
          lat: -1.57991,
          lng: 53.79987,
          status: TrainStatus.NORMAL,
        },
        {
          id: '4b9863bf-f80e-42d4-9211-0da1bd74002b',
          lat: -1.509622116417063,
          lng: 55.036557695836905,
          status: TrainStatus.NORMAL,
        },
        {
          id: 'dcfa46da-cfb7-4ebc-8779-93fb7e765aed',
          lat: -0.23847191786023814,
          lng: 52.48693345402913,
          status: TrainStatus.BROKEN,
        },
        {
          id: '7440c060-2b9f-47cf-9ef8-0ec4c44e4007',
          lat: -0.6221458126328798,
          lng: 51.38973802143326,
          status: TrainStatus.NORMAL,
        },
        {
          id: '6b142445-cb65-4826-854e-9988d3765765',
          lat: -3.3326076447392836,
          lng: 51.640701112358386,
          status: TrainStatus.NORMAL,
        },
        {
          id: '9d6812e6-91b7-4654-85cb-da1dc7abd5fa',
          lat: -2.707410950260396,
          lng: 54.75467743562737,
          status: TrainStatus.DELAYED,
        },
      ]),
    );
  }),
];
