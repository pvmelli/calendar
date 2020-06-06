import Events from '../events.js';
import Creator from '../creator.js';
import Attendees from '../attendees.js';

test ("Test classes", () => {
    const EVENT_WITH_KEY_DATA = {"id": 3, "created" : "2020-01-01", "updated" : "2020-01-01",
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

        const creatorTest = new Creator (EVENT_WITH_KEY_DATA.creator);
        expect(creatorTest.email).toEqual(EVENT_WITH_KEY_DATA.creator.email);

        const AtteendeeTest = new Attendees(EVENT_WITH_KEY_DATA.attendees[0]);
        console.log(AtteendeeTest);
        expect(AtteendeeTest.email).toEqual(EVENT_WITH_KEY_DATA.attendees[0].email);

        const eventTest = new Events(EVENT_WITH_KEY_DATA, creatorTest, [AtteendeeTest]);
        expect(eventTest.start).toEqual(EVENT_WITH_KEY_DATA.start);
        expect(eventTest.creator.email).toEqual(EVENT_WITH_KEY_DATA.creator.email);
        expect(eventTest.attendees[0]).toEqual(EVENT_WITH_KEY_DATA.attendees[0]);

        const eventTestSecond = new Events(EVENT_WITH_KEY_DATA, creatorTest);
        expect(eventTestSecond.attendees).toEqual([]);

        const eventTestThird = new Events(EVENT_WITH_KEY_DATA, creatorTest, {});
        expect(eventTestThird.attendees).toEqual({});

})