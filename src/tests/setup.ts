import { beforeAll, afterAll, expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as matchers from '@testing-library/jest-dom/matchers';
import { server } from '../mocks/node';
import '../mocks/mapbox-gl';
import '../mocks/resize-observer';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import highchartsGauge from 'highcharts/modules/solid-gauge';

HighchartsMore(Highcharts);
highchartsGauge(Highcharts);

expect.extend(matchers);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
