import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import { QueryClient, QueryClientProvider } from 'react-query';
import { setupStore } from './store/store';
import { Provider } from 'react-redux';

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
