import { vi } from 'vitest';

vi.mock('mapbox-gl', async () => {
  const Map = vi.fn();
  Map.prototype.accessToken = '';
  Map.prototype.on = () => undefined;
  Map.prototype.addControl = () => undefined;
  Map.prototype.remove = () => undefined;
  return {
    default: {
      Map: Map,
      NavigationControl: vi.fn(),
    },
  };
});
