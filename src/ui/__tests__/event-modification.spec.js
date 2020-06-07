import {cancelEvent, markEventAsConfirmed, modifyEventItem} from '../event-modification.js';
import fixture from '../../__tests__/modal.fixture.js'

describe("Testea la modificación de eventos", () => {

    beforeEach(() => {
        jest.spyOn(Storage.prototype, 'setItem')
    });
    
    afterEach(() => {
        localStorage.setItem.mockRestore()
    })

    const EVENT_WITH_KEY_DATA = {"id": 3, "created" : "2020-01-01", "updated" : "2020-01-01",
    "summary" : "event", "description" : "test description", "color" : "#0000ff",
    "start": "2020-04-27T22:43:52.214Z", "end": "2020-04-27T23:43:52.214Z",
    "creator": {"id": 5, "email": "melaza@gmail.com", "displayName": "Melaza", "self": true}, "keyword": "32020-01-015",
    "startDay": "2020-04-27", "startHour": "22", "startMinutes": "43",
    "endDay": "2020-04-27", "endHour": "23", "endMinutes": "43", "attendees":
    [{"id": 2, "email": "pepe@gmail", "displayName" : "Pepito", "organizer": true, "self": false, "responseStatus": true},
    {"id": 3, "email": "pepe@gmail", "displayName" : "Pepito", "organizer": true, "self": false, "responseStatus": false},
    {"id": 4, "email": "pepe@gmail", "displayName" : "Pepito", "organizer": true, "self": false, "responseStatus": null},
    {"id": 5, "email": "pepe@gmail", "displayName" : "Pepito", "organizer": false, "self": true, "responseStatus": false},
    {"id": 6, "email": "pepe@gmail", "displayName" : "Pepito", "organizer": false, "self": true, "responseStatus": true},
    {"id": 7, "email": "pepe@gmail", "displayName" : "Pepito", "organizer": true, "self": true, "responseStatus": null}]}

    test("Marcar eventos como cancelados", () => {

        const CANCELLED_EVENT = {"id": 3, "created" : "2020-01-01", "updated" : "2020-01-01",
        "summary" : "event", "description" : "test description", "color" : "#A0A0A0",
        "start": "2020-04-27T22:43:52.214Z", "end": "2020-04-27T23:43:52.214Z",
        "creator": {"id": 5, "email": "melaza@gmail.com", "displayName": "Melaza", "self": true}, "keyword": "32020-01-015",
        "startDay": "2020-04-27", "startHour": "22", "startMinutes": "43",
        "endDay": "2020-04-27", "endHour": "23", "endMinutes": "43", "attendees":
        [{"id": 2, "email": "pepe@gmail", "displayName" : "Pepito", "organizer": true, "self": false, "responseStatus": true},
        {"id": 3, "email": "pepe@gmail", "displayName" : "Pepito", "organizer": true, "self": false, "responseStatus": false},
        {"id": 4, "email": "pepe@gmail", "displayName" : "Pepito", "organizer": true, "self": false, "responseStatus": null},
        {"id": 5, "email": "pepe@gmail", "displayName" : "Pepito", "organizer": false, "self": true, "responseStatus": false},
        {"id": 6, "email": "pepe@gmail", "displayName" : "Pepito", "organizer": false, "self": true, "responseStatus": true},
        {"id": 7, "email": "pepe@gmail", "displayName" : "Pepito", "organizer": true, "self": true, "responseStatus": null}], "status" : "cancelled"}

        const TARGET = document.createElement('div')

        const PARENT = document.createElement('div')
        PARENT.dataset.obj = `${JSON.stringify(EVENT_WITH_KEY_DATA)}`;
        PARENT.dataset.keyword = `${EVENT_WITH_KEY_DATA.keyword}`;

        PARENT.appendChild(TARGET);

        let MOCK_EVENT = document.createEvent('Event');
        MOCK_EVENT.initEvent('mock', true, true);
        Object.defineProperty(MOCK_EVENT, 'target', {writable: true, value: TARGET});      

        cancelEvent(MOCK_EVENT)
        expect(localStorage.setItem).toHaveBeenCalledWith(`${EVENT_WITH_KEY_DATA.keyword}`, `${JSON.stringify(CANCELLED_EVENT)}`)
    })

    test("Marcar eventos como confirmados", () => {
        const CONFIRMED_EVENT = {"id": 3, "created" : "2020-01-01", "updated" : "2020-01-01",
        "summary" : "event", "description" : "test description", "color" : "#43bbef",
        "start": "2020-04-27T22:43:52.214Z", "end": "2020-04-27T23:43:52.214Z",
        "creator": {"id": 5, "email": "melaza@gmail.com", "displayName": "Melaza", "self": true}, "keyword": "32020-01-015",
        "startDay": "2020-04-27", "startHour": "22", "startMinutes": "43",
        "endDay": "2020-04-27", "endHour": "23", "endMinutes": "43", "attendees":
        [{"id": 2, "email": "pepe@gmail", "displayName" : "Pepito", "organizer": true, "self": false, "responseStatus": true},
        {"id": 3, "email": "pepe@gmail", "displayName" : "Pepito", "organizer": true, "self": false, "responseStatus": false},
        {"id": 4, "email": "pepe@gmail", "displayName" : "Pepito", "organizer": true, "self": false, "responseStatus": null},
        {"id": 5, "email": "pepe@gmail", "displayName" : "Pepito", "organizer": false, "self": true, "responseStatus": false},
        {"id": 6, "email": "pepe@gmail", "displayName" : "Pepito", "organizer": false, "self": true, "responseStatus": true},
        {"id": 7, "email": "pepe@gmail", "displayName" : "Pepito", "organizer": true, "self": true, "responseStatus": null}], "status": "confirmed"}

        const TARGET = document.createElement('div')

        const PARENT = document.createElement('div')
        PARENT.dataset.obj = `${JSON.stringify(EVENT_WITH_KEY_DATA)}`;
        PARENT.dataset.keyword = `${EVENT_WITH_KEY_DATA.keyword}`;

        PARENT.appendChild(TARGET);

        let MOCK_EVENT = document.createEvent('Event');
        MOCK_EVENT.initEvent('mock', true, true);
        Object.defineProperty(MOCK_EVENT, 'target', {writable: true, value: TARGET});      

        markEventAsConfirmed(MOCK_EVENT)
        expect(localStorage.setItem).toHaveBeenCalledWith(`${EVENT_WITH_KEY_DATA.keyword}`, `${JSON.stringify(CONFIRMED_EVENT)}`)
    })

    test("Modificar los detalles de un evento", () => {
        document.body.innerHTML = fixture;
        const { location } = window;
        delete window.location;
        window.location = { reload: jest.fn() };

        const UNMODIFIED_EVENT = {"id": 3, "created" : "2020-01-01", "updated" : "2020-01-01",
        "summary" : "event", "description" : "test description", "color" : "#0000ff",
        "start": "2020-04-27T22:43:52.214Z", "end": "2020-04-27T23:43:52.214Z",
        "creator": {"id": 5, "email": "melaza@gmail.com", "displayName": "Melaza", "self": true}, "keyword": "32020-01-015",
        "startDay": "2020-04-27", "startHour": "22", "startMinutes": "43",
        "endDay": "2020-04-27", "endHour": "23", "endMinutes": "43", "attendees":
        [{"id": 2, "email": "pepe@gmail", "displayName" : "Pepito", "organizer": true, "self": false, "responseStatus": null},
        {"id": 6, "email": "pepe@gmail", "displayName" : "Pepito", "organizer": false, "self": true, "responseStatus": null},]}

        const EVENT_DISPLAY = document.querySelector('#testEventDisplay');
        EVENT_DISPLAY.dataset.obj = JSON.stringify(UNMODIFIED_EVENT);

        const TARGET = document.createElement('div')

        const PARENT = document.createElement('div')
        PARENT.dataset.obj = `${JSON.stringify(EVENT_WITH_KEY_DATA)}`;
        PARENT.dataset.keyword = `${EVENT_WITH_KEY_DATA.keyword}`;

        PARENT.appendChild(TARGET);

        let MOCK_EVENT = document.createEvent('Event');
        MOCK_EVENT.initEvent('mock', true, true);
        Object.defineProperty(MOCK_EVENT, 'target', {writable: true, value: TARGET});

        modifyEventItem(MOCK_EVENT, PARENT)

        const yesRadio = document.querySelector('#yes-radio');
        yesRadio.checked = true;

        modifyEventItem(MOCK_EVENT, PARENT)

        const noRadio = document.querySelector('#no-radio');
        noRadio.checked = true;

        modifyEventItem(MOCK_EVENT, PARENT)

        yesRadio.remove()
        noRadio.remove()

        modifyEventItem(MOCK_EVENT, PARENT)

        expect(localStorage.setItem).toHaveBeenCalledTimes(4)

        expect(localStorage.setItem.mock.calls).toEqual([
            ["test-keyword", expect.stringContaining('\"summary\":\"test summary\"')],
            ["test-keyword", expect.stringContaining('\"self\":true,\"responseStatus\":true')],
            ["test-keyword", expect.stringContaining('\"self\":true,\"responseStatus\":false')],
            ["test-keyword", expect.stringContaining('\"self\":true,\"responseStatus\":false')],
          ]);
    })

})