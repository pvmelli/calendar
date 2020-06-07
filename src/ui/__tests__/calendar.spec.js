import {manageWeeklyView, manageCalendarCreation} from '../calendar.js'
import fixture from '../../__tests__/calendar.fixture.js'


describe ("Testea el calendario", () => {
    const EVENT_WITH_KEY_DATA = {"id": 3, "created" : "2020-01-01",
    "start": "2020-04-27T22:43:52.214Z", "end": "2020-04-27T23:43:52.214Z",
    "creator": {"id": 5}, "keyword": "32020-01-015",
    "startDay": "2020-04-27", "startHour": "22", "startMinutes": "43",
    "endDay": "2020-04-27", "endHour": "23", "endMinutes": "43"}

    const WEEKDAYS = ['2020-04-27', '2020-04-28', '2020-04-29', '2020-04-30', '2020-05-01', '2020-05-02'];

    test("Testea la vista semanal", () => {
        document.body.innerHTML = fixture;  
        const mockGetWeekdays = jest.fn()
        .mockReturnValue(WEEKDAYS);
        const mockGetEvents = jest.fn()
        .mockReturnValue(Promise.resolve([EVENT_WITH_KEY_DATA]));
    
        expect(manageWeeklyView(mockGetWeekdays, mockGetEvents)).toBe('Managed successfully')
        expect(mockGetWeekdays).toHaveBeenCalledTimes(1);

        expect(mockGetEvents).toHaveBeenCalledTimes(1);
        expect(mockGetEvents.mock.calls).toEqual([
            [WEEKDAYS, expect.anything(), expect.anything()],
          ]);

          expect(() => {
            manageWeeklyView();
          }).toThrow(/^Cannot read property 'then' of undefined$/);

          expect(() => {
            manageWeeklyView(mockGetWeekdays);
          }).toThrow(/^Cannot read property 'then' of undefined$/);

        manageCalendarCreation();

        expect(() => {
            manageCalendarCreation(WEEKDAYS);
          }).toThrow(/^Failed to execute 'appendChild' on 'Node': parameter 1 is not of type 'Node'.$/);

    });

});

