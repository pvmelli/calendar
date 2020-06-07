import {displayEvents, displaySingleEvent, displayEventDetails, createEventInfoBox} from '../events.js';
import fixture from '../../__tests__/calendar.fixture.js'

beforeEach(() => {
    jest.fn().mockClear() 
});
describe("Testea la visualización de eventos", () => {

    document.body.innerHTML = fixture;

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

    const ALT_EVENT_WITH_KEY_DATA = {"id": 3, "created" : "2020-01-01", "updated" : "2020-01-01",
    "summary" : "event", "description" : "test description", "color" : "#0000ff",
    "start": "2020-04-27T22:43:52.214Z", "end": "2020-04-27T23:43:52.214Z",
    "creator": {"id": 5, "email": "melaza@gmail.com", "displayName": "Melaza", "self": false}, "keyword": "32020-01-015",
    "startDay": "2020-04-27", "startHour": "22", "startMinutes": "43",
    "endDay": "2020-04-27", "endHour": "23", "endMinutes": "43", "attendees":
    [{"id": 2, "email": "pepe@gmail", "displayName" : "Pepito", "organizer": false, "self": false, "responseStatus": true},
    {"id": 40, "email": "pepe@gmail", "displayName" : "Pepito", "organizer": false, "self": false, "responseStatus": false},
    {"id": 45, "email": "pepe@gmail", "displayName" : "Pepito", "organizer": false, "self": false, "responseStatus": null},
    {"id": 3, "email": "pepe@gmail", "displayName" : "Pepito", "organizer": true, "self": false, "responseStatus": false},
    {"id": 60, "email": "pepe@gmail", "displayName" : "Pepito", "organizer": true, "self": false, "responseStatus": true},
    {"id": 4, "email": "pepe@gmail", "displayName" : "Pepito", "organizer": true, "self": false, "responseStatus": null},
    {"id": 5, "email": "pepe@gmail", "displayName" : "Pepito", "organizer": false, "self": true, "responseStatus": false},
    {"id": 6, "email": "pepe@gmail", "displayName" : "Pepito", "organizer": false, "self": true, "responseStatus": true},
    {"id": 65, "email": "pepe@gmail", "displayName" : "Pepito", "organizer": true, "self": true, "responseStatus": false},
    {"id": 70, "email": "pepe@gmail", "displayName" : "Pepito", "organizer": true, "self": true, "responseStatus": null},
    {"id": 7, "email": "pepe@gmail", "displayName" : "Pepito", "organizer": false, "self": true, "responseStatus": null}]}

    const $calendarContainer = document.querySelector('#calendar-container');
    const $eventContainer = document.createElement('div');
    $eventContainer.dataset.hour = `${EVENT_WITH_KEY_DATA.startDay}-${EVENT_WITH_KEY_DATA.startHour}`

    $calendarContainer.appendChild($eventContainer);

    test("Muestra múltiples eventos", () => {    
        const mockDisplaySingleEvent = jest.fn()
    
        displayEvents([EVENT_WITH_KEY_DATA, ALT_EVENT_WITH_KEY_DATA], mockDisplaySingleEvent)

        displayEvents([EVENT_WITH_KEY_DATA, ALT_EVENT_WITH_KEY_DATA])
    });

    test("Muestra un único evento", () => {
        Element.prototype.addEventListener = jest.fn()

        displaySingleEvent(EVENT_WITH_KEY_DATA);

        expect(document.querySelectorAll('.event')).toBeDefined();
        expect($eventContainer.children).toBeDefined();
        expect(Element.prototype.addEventListener).toHaveBeenCalledTimes(3)
    });

    test("Muestra los detalles de un evento", () => {
        Element.prototype.addEventListener = jest.fn()
        displaySingleEvent(ALT_EVENT_WITH_KEY_DATA); 

        const TARGET2 = document.querySelectorAll('.fa-cog')[1];
        let MOCK_EVENT2 = document.createEvent('Event');
        MOCK_EVENT2.initEvent('mock', true, true);
        Object.defineProperty(MOCK_EVENT2, 'target', {writable: true, value: TARGET2});  


        displayEventDetails(MOCK_EVENT2)
        expect(document.querySelector('#event-content').children).toBeDefined();
        expect(document.querySelector('#event-information .creation-info h5').innerHTML).toBe('Melaza')

        displaySingleEvent(EVENT_WITH_KEY_DATA);       

        const TARGET1 = document.querySelectorAll('.fa-cog')[0];
        let MOCK_EVENT1 = document.createEvent('Event');
        MOCK_EVENT1.initEvent('mock', true, true);
        Object.defineProperty(MOCK_EVENT1, 'target', {writable: true, value: TARGET1});       

        displayEventDetails(MOCK_EVENT1)

        expect(document.querySelector('#event-information .creation-info h5').innerHTML).toBe('You created this event')
        
        expect(document.querySelector('#event-information .btn').getAttribute('onClick')).toBeDefined()
        expect(Element.prototype.addEventListener).toHaveBeenCalledTimes(10);

    })

    test("Muestra los detalles de eventos alternativos", () => {
        Element.prototype.addEventListener = jest.fn()
        displaySingleEvent(ALT_EVENT_WITH_KEY_DATA); 

        const TARGET2 = document.querySelectorAll('.fa-cog')[1];
        let MOCK_EVENT2 = document.createEvent('Event');
        MOCK_EVENT2.initEvent('mock', true, true);
        Object.defineProperty(MOCK_EVENT2, 'target', {writable: true, value: TARGET2});  


        displayEventDetails(MOCK_EVENT2)
        expect(document.querySelector('#event-content').children).toBeDefined();
        expect(document.querySelector('#event-information .creation-info h5').innerHTML).toBe('Melaza')

        displaySingleEvent(EVENT_WITH_KEY_DATA);       

        const TARGET1 = document.querySelectorAll('.fa-cog')[0];
        let MOCK_EVENT1 = document.createEvent('Event');
        MOCK_EVENT1.initEvent('mock', true, true);
        Object.defineProperty(MOCK_EVENT1, 'target', {writable: true, value: TARGET1});       

        displayEventDetails(MOCK_EVENT1)

        expect(document.querySelector('#event-information .creation-info h5').innerHTML).toBe('You created this event')
        
        expect(document.querySelector('#event-information .btn').getAttribute('onClick')).toBeDefined()
        expect(Element.prototype.addEventListener).toHaveBeenCalledTimes(10);
    })

});



