import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }
  const { worker } = await import('./mocks/browser.ts');
  return worker.start({
    onUnhandledRequest(request, print) {
      if (
        request.url.includes('api.mapbox.com') ||
        request.url.includes('events.mapbox.com') ||
        request.url.includes('/src/assets/')
      ) {
        return;
      }
      print.warning();
    },
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
