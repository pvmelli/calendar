import {getEvents, addKeyData} from '../service.js'
import {saveEventsToLocalStorage} from '../../storage/storage.js'

describe ("Setting and getting events", () => {
    beforeEach(() => {
        jest.spyOn(Storage.prototype, 'setItem');
        jest.fn().mockClear() 
    });

    afterEach(() => {
        localStorage.setItem.mockRestore()
    })

    const EVENT_WITHOUT_KEY_DATA = {"id": 3, "created" : "2020-01-01",
    "start": "2020-04-27T22:43:52.214Z", "end": "2020-04-27T23:43:52.214Z",
    "creator": {"id": 5}}

    const EVENT_WITH_KEY_DATA = {"id": 3, "created" : "2020-01-01",
    "start": "2020-04-27T22:43:52.214Z", "end": "2020-04-27T23:43:52.214Z",
    "creator": {"id": 5}, "keyword": "32020-01-015",
    "startDay": "2020-04-27", "startHour": "22", "startMinutes": "43",
    "endDay": "2020-04-27", "endHour": "23", "endMinutes": "43", "status": "pending"}

    const NON_MATCHING_EVENT = {"id": 3, "created" : "2020-01-01",
    "start": "1920-04-27T22:43:52.214Z", "end": "1920-04-27T23:43:52.214Z",
    "creator": {"id": 5}}
    
    const NON_MATCHING_EVENT_WITH_KEY_DATA = {"id": 3, "created" : "2020-01-01",
    "start": "1920-04-27T22:43:52.214Z", "end": "1920-04-27T23:43:52.214Z",
    "creator": {"id": 5}, "keyword": "32020-01-015",
    "startDay": "1920-04-27", "startHour": "22", "startMinutes": "43",
    "endDay": "1920-04-27", "endHour": "23", "endMinutes": "43", "status": "pending"}

    const EVENTS_DATA_MOCK = [EVENT_WITHOUT_KEY_DATA, NON_MATCHING_EVENT]
    const EVENTS_DATA_MOCK_WITH_KEYS = [EVENT_WITH_KEY_DATA, NON_MATCHING_EVENT_WITH_KEY_DATA]

    test("Getting events from the API", async () => {
        const loadfromApiMock = jest.fn()
        .mockReturnValue(Promise.resolve(EVENTS_DATA_MOCK))
        const saveToLocalStorageMock = jest.fn();

        expect (await loadfromApiMock()).toEqual(EVENTS_DATA_MOCK);

        expect(await getEvents(['2020-06-04', '2020-04-27'], loadfromApiMock, saveToLocalStorageMock)).toEqual([EVENT_WITH_KEY_DATA]);
        expect(loadfromApiMock).toBeCalledTimes(2);
        expect(saveToLocalStorageMock).toHaveBeenCalledTimes(2)
        expect(saveToLocalStorageMock.mock.calls).toEqual([
            [EVENT_WITH_KEY_DATA.keyword, EVENT_WITH_KEY_DATA],
            [NON_MATCHING_EVENT_WITH_KEY_DATA.keyword, NON_MATCHING_EVENT_WITH_KEY_DATA]
          ]);

        expect (await loadfromApiMock()).toEqual(EVENTS_DATA_MOCK_WITH_KEYS);

    });

    test("Getting events from Local Storage", async () => {
        const mockLoading = jest.fn()
        .mockReturnValue(Promise.resolve(EVENTS_DATA_MOCK))
        const saveToLocalStorageMock = jest.fn();

        getEvents(['2020-06-04', '2020-06-05'])

        saveEventsToLocalStorage(EVENT_WITH_KEY_DATA.keyword, EVENT_WITH_KEY_DATA);

        expect(await getEvents(['2020-06-04', '2020-04-27'], mockLoading, saveToLocalStorageMock)).toEqual([EVENT_WITH_KEY_DATA])
        expect(saveToLocalStorageMock).toBeCalledTimes(0);
        expect(mockLoading).toBeCalledTimes(0);

    });

    test("Setting event key data", () => {
        expect(addKeyData(EVENT_WITHOUT_KEY_DATA)).toEqual(EVENT_WITH_KEY_DATA);
    });


})
