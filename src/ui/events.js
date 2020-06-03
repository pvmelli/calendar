class Events {
    constructor(eventData, creatorData, attendeesData = []) {
        this.id = eventData.id;
        this.created = eventData.created;
        this.updated = eventData.updated;
        this.summary = eventData.summary;
        this.description = eventData.description;
        this.color = eventData.color;
        this.startDay = eventData.start.slice(0,10);
        this.startHour = eventData.start.slice(11,13);
        this.startMinutes = eventData.start.slice(14,16);
        this.endDay = eventData.end.slice(0,10);
        this.endHour = eventData.end.slice(11,13);
        this.endMinutes = eventData.start.slice(14,16);
        this.creator = creatorData;
        this.attendees = attendeesData;
    }

}

class Creator {
    constructor(data){
        this.id = data.id;
        this.email = data.email;
        this.displayName = data.displayName;
        this.self = data.self;
    }
}

class Attendees {
    constructor(data){
        this.id = data.id;
        this.email = data.email;
        this.displayName = data.displayName;
        this.organizer = data.organizer;
        this.self = data.self;
        this.responseStatus = data.responseStatus;
    }
}

export function displayEvents(eventsArray, displaySingleEventCallback = () => {}){

    eventsArray.forEach((eventData) => {
        let attendeesList = [];
        for (const attendee of eventData.attendees){
            const singleAttendee = new Attendees(attendee)
            attendeesList.push(singleAttendee)
        };
        const creator = new Creator(eventData.creator)

        const event = new Events(eventData, creator, attendeesList);

        displaySingleEventCallback(event);

    });
};

export function displaySingleEvent(event) {
    const $eventContainer = document.querySelector(`[data-hour="${event.startDay}-${event.startHour}"]`)
    const $event = document.createElement('div');
    $event.classList.add('event');
    $event.style.backgroundColor = event.color;
    $event.innerText = event.summary;
    $event.dataset.created = `${event.created}`
    $event.dataset.updated = `${event.updated}`
    $event.dataset.summary = `${event.summary}`
    $event.dataset.description = `${event.description}`
    $event.dataset.start = `${event.startDay} at ${event.startHour}:${event.startMinutes}`
    $event.dataset.end = `${event.endDay} at ${event.endHour}:${event.endMinutes}`
    $event.dataset.creator = `${JSON.stringify(event.creator)}`
    $event.dataset.attendees = `${JSON.stringify(event.attendees)}`
    $event.onclick = (e) => {
        displayEventDetails(e, createEventInfoBox);
    };

    $eventContainer.appendChild($event);
};


