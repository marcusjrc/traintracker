import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import { QueryClient, QueryClientProvider } from 'react-query';
import { setupStore } from './store/store';
import { Provider } from 'react-redux';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import highchartsGauge from 'highcharts/modules/solid-gauge';

HighchartsMore(Highcharts);
highchartsGauge(Highcharts);
gsap.registerPlugin(useGSAP);
const router = createBrowserRouter([
  {
    path: '/',
    Component: Dashboard,
  },
  {
    path: '*',
    Component: NotFound,
  },
]);

const queryClient = new QueryClient();
const store = setupStore();

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </Provider>
  );
}
