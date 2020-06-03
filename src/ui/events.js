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

function displayEventDetails(e, createEventInfoBoxCallback = () => {}) {
    const $modal = document.querySelector('#event-modal');
    $modal.classList.remove('not-display');
    const $closeButton = document.querySelector('#close-modal-button')
    $closeButton.addEventListener('click', closeModal)

    const $container = document.querySelector('#event-content');

    const $eventInfoBox = createEventInfoBoxCallback(e.target);

    $container.appendChild($eventInfoBox)
}

function createEventInfoBox(event) {
    const $infoBox = document.createElement('form');

    const $title = document.createElement('input')
    $title.setAttribute('type', 'text');
    $title.classList.add('form-control');
    $title.value = event.getAttribute('data-summary');
    $infoBox.appendChild($title);

    const $date = document.createElement('p');
    $date.classList.add('text-muted')
    $date.innerText = `${event.getAttribute('data-start')} - ${event.getAttribute('data-end')}`
    $infoBox.appendChild($date);

    const $description = document.createElement('textarea');
    $description.classList.add('form-control');
    $description.value = event.getAttribute('data-description');
    $infoBox.appendChild($description);

    const creator = JSON.parse(event.getAttribute('data-creator'));

    const $creationInfo = document.createElement('div');
    $creationInfo.classList.add('row');

    const $creator = document.createElement('div');
    $creator.classList.add('col');

    if (creator.self){
        $creator.innerHTML = `<strong>You created this event</strong>`;
    }else {
        const $creatorHTML = `<strong>${creator.displayName}</strong><p>${creator.email}</p>`
        $creator.innerHTML = $creatorHTML;
    }


    const $creation = document.createElement('div');
    $creation.classList.add('col');
    const $creationHTML = `<ul><li>Created: ${event.getAttribute('data-created')}</li><li>Updated: ${event.getAttribute('data-updated')}</li>`
    $creation.innerHTML = $creationHTML;

    $creationInfo.appendChild($creator)
    $creationInfo.appendChild($creation)

    $infoBox.appendChild($creationInfo);


    const $attendeeBox = document.createElement('div');
    $attendeeBox.classList.add('row');

    const attendees = JSON.parse(event.getAttribute('data-attendees'));

    attendees.forEach((person) => {
        const $onePerson = document.createElement('div');
        $onePerson.classList.add('col');

        if(person.self && !person.organizer){
            const message = `<strong>Will you attend?</strong>`
            const radioButtons = `  <input type="radio" id="yes" name="attending" value="yes" class="custom-radio">
            <label for="yes">YES</label><br>
            <input type="radio" id="no" name="attending" value="no" class="custom-radio">
            <label for="no">NO</label>`
            $onePerson.innerHTML = message + radioButtons;
        }else {
            const name = `<strong>${person.displayName}</strong>`
            const email = `<p class="text-muted">${person.email}</p>`
            const isOrganizer = person.organizer ? `<p class="text-muted">Organizer</p>` : `<p class="text-muted">Invited</p>`
            const isAttending = person.responseStatus ? `<p class="text-muted">They'll go!</p>` : `<p class="text-muted">They rather stay home</p>`

            $onePerson.innerHTML = name + email + isOrganizer + isAttending;
        }
        $attendeeBox.appendChild($onePerson);
    })


    $infoBox.appendChild($attendeeBox);

    const $acceptButton = document.createElement('button');
    $acceptButton.classList.add('btn');
    $acceptButton.innerText = 'DONE'

    $infoBox.appendChild($acceptButton);

    return $infoBox;
};


function closeModal() {
    const $modal = document.querySelector('#event-modal');
    $modal.classList.add('not-display');
    const $container = document.querySelector('#event-content');
    $container.innerHTML = '';
};


