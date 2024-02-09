import { HttpResponse, delay, http } from 'msw';
import { BASE_URL, Routes } from '../api/client';
import { trains } from './data/trains';

const url = (url: string) => BASE_URL + url;

export const handlers = [
  http.get(url(Routes.trains), async () => {
    await delay(600);
    return HttpResponse.json(Array.from(trains));
  }),
];
