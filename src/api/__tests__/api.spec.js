import {loadAllEventsFromApi} from '../api.js';

test ('Carga datos de la api', () => {
    global.fetch = jest.fn();
    global.fetch.mockImplementation(() => new Promise((resolve) => {
        const jsonPromise = new Promise((r) => {
          r([]);
        });
        resolve({ json: () => jsonPromise });
      }));

      const BASE_URL = './src/services/events.json';

      loadAllEventsFromApi();

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(BASE_URL)
});