import { saveEventsToLocalStorage } from "../storage/storage.js";

class Events {
    constructor(eventData, creatorData, attendeesData = []) {
        this.id = eventData.id;
        this.created = eventData.created;
        this.updated = eventData.updated;
        this.keyword = eventData.keyword;
        this.summary = eventData.summary;
        this.description = eventData.description;
        this.color = eventData.color;
        this.start = eventData.start;
        this.startDay = eventData.start.slice(0,10);
        this.startHour = eventData.start.slice(11,13);
        this.startMinutes = eventData.start.slice(14,16);
        this.end = eventData.end;
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

        displaySingleEventCallback(event, displayEventButtons);

    });
};

export function displaySingleEvent(event, displayEventButtonsCallback = () => {}) {
    const $eventContainer = document.querySelector(`[data-hour="${event.startDay}-${event.startHour}"]`)
    const $event = document.createElement('div');
    $event.classList.add('event');
    $event.style.backgroundColor = event.color;
    $event.innerText = event.summary;
    $event.dataset.keyword = `${event.keyword}`
    $event.dataset.origStart = `${event.startDay}`
    $event.dataset.duration = `${event.startDay} at ${event.startHour}:${event.startMinutes} - ${event.endDay} at ${event.endHour}:${event.endMinutes}`
    $event.dataset.status = 'pending';
    $event.dataset.obj = `${JSON.stringify(event)}`;

    displayEventButtonsCallback($event)    

    $eventContainer.appendChild($event);
};

function displayEventButtons($event) {
    const $doneButton = document.createElement('a');
    $doneButton.classList.add('fa')
    $doneButton.classList.add('fa-check-square-o')
    $doneButton.addEventListener('click', markEventAsDone);

    $event.appendChild($doneButton);

    const $cancelButton = document.createElement('a');
    $cancelButton.classList.add('fa')
    $cancelButton.classList.add('fa-trash-o')
    $cancelButton.addEventListener('click', cancelEvent);

    $event.appendChild($cancelButton);

    const $modifyButton = document.createElement('a');
    $modifyButton.classList.add('fa')
    $modifyButton.classList.add('fa-cog')
    $modifyButton.onclick = (e) => {
        displayEventDetails(e, createEventInfoBox);
    };

    $event.appendChild($modifyButton);
};

function cancelEvent(e) {
    const $event = e.target.parentNode;
    $event.style.backgroundColor = '#A0A0A0';
    const eventObj = JSON.parse($event.getAttribute('data-obj'));
    eventObj.color = '#A0A0A0';
    $event.dataset.obj = `${JSON.stringify(eventObj)}`;
    $event.dataset.status = 'cancelled';

    const origDay = $event.getAttribute('data-orig-start');
    const eventCreation = $event.getAttribute('data-keyword');

    saveEventsToLocalStorage(origDay, eventCreation, eventObj)
};

function markEventAsDone(e) {
    const $event = e.target.parentNode;
    $event.style.backgroundColor = '#43bbef';
    const eventObj = JSON.parse($event.getAttribute('data-obj'));
    eventObj.color = '#43bbef';
    $event.dataset.obj = `${JSON.stringify(eventObj)}`;
    $event.dataset.status = 'done';

    const origDay = $event.getAttribute('data-orig-start');
    const eventCreation = $event.getAttribute('data-keyword');

    saveEventsToLocalStorage(origDay, eventCreation, eventObj)
};

function displayEventDetails(e, createEventInfoBoxCallback = () => {}) {
    const $modal = document.querySelector('#event-modal');
    $modal.classList.remove('not-display');
    const $closeButton = document.querySelector('#close-modal-button')
    $closeButton.addEventListener('click', closeModal)

    const $container = document.querySelector('#event-content');

    const $eventInfoBox = createEventInfoBoxCallback(e.target.parentNode);

    $container.appendChild($eventInfoBox)
}

function createEventInfoBox(event) {
    const $infoBox = document.createElement('form');

    const eventObj = JSON.parse(event.getAttribute('data-obj'));

    const $title = document.createElement('input')
    $title.setAttribute('type', 'text');
    $title.setAttribute('id', 'summary-modif');
    $title.classList.add('form-control');
    $title.value = eventObj.summary;
    $infoBox.appendChild($title);

    const $status = document.createElement('strong');
    $status.classList.add('text-muted')
    $status.innerText = `Status: ${event.getAttribute('data-status')}`
    $infoBox.appendChild($status);

    const $date = document.createElement('p');
    $date.classList.add('text-muted')
    $date.innerText = `${event.getAttribute('data-duration')}`
    $infoBox.appendChild($date);

    const $description = document.createElement('textarea');
    $description.setAttribute('id', 'description-modif');
    $description.classList.add('form-control');
    $description.value = eventObj.description;
    $infoBox.appendChild($description);

    const $creationInfo = document.createElement('div');
    $creationInfo.classList.add('row');
    $creationInfo.classList.add('creation-info');


    const $creator = document.createElement('div');
    $creator.classList.add('col');

    if (eventObj.creator.self){
        $creator.innerHTML = `<h5>You created this event</h5>`;
    }else {
        const $creatorHTML = `<h5>${eventObj.creator.displayName}</h5><p>${eventObj.creator.email}</p>`
        $creator.innerHTML = $creatorHTML;
    }

    const $separator = document.createElement('div');
    $separator.classList.add('separator');


    const $creation = document.createElement('div');
    $creation.classList.add('col');
    const $creationHTML = `<ul><li>Created: ${eventObj.created}</li><li>Updated: ${eventObj.updated}</li>`
    $creation.innerHTML = $creationHTML;

    $creationInfo.appendChild($creator)
    $creationInfo.appendChild($separator)
    $creationInfo.appendChild($creation)

    $infoBox.appendChild($creationInfo);


    const $attendeeBox = document.createElement('div');
    $attendeeBox.classList.add('row');
    $attendeeBox.classList.add('attendee-box');

    eventObj.attendees.forEach((person) => {
        const $onePerson = document.createElement('div');
        $onePerson.classList.add('col');
        $onePerson.classList.add('person');

        if(person.self && !person.organizer){
            const you = `<strong>You were invited!</strong><br>`
            const invitationAccepted = `<p class="text-muted">Invitation accepted</p>`;
            const invitationRejected = `<p class="text-muted">Invitation rejected</p>`;
            const unsure = `<p>Will you attend?</p>
            <div><input class="custom-radio form-check-input radio-btn" type="radio" name="attending" id="yes-radio" value="true"><label class="form-check-label radio-label" for="yes">yes</label></div>
            <div><input class="custom-radio form-check-input radio-btn" type="radio" name="attending" id="no-radio" value="false"><label class="form-check-label radio-label" for="no">no</label></div>`
            
            const isAttending = person.responseStatus ?  invitationAccepted : person.responseStatus === false ? invitationRejected : unsure;
            $onePerson.innerHTML = you + isAttending;
        }else {
            const name = `<strong>${person.displayName}</strong>`
            const email = `<p class="text-muted">${person.email}</p>`
            const isOrganizer = person.organizer ? `<p class="text-muted">Organizer</p>` : `<p class="text-muted">Invited</p>`
            const isAttending = person.responseStatus ? `<p>They'll go!</p>` : 
            person.responseStatus = false? `<p>They rather stay home</p>` : `<p>Haven't responded</p>` 

            $onePerson.innerHTML = name + email + isOrganizer + isAttending;
        }
        $attendeeBox.appendChild($onePerson);
    })


    $infoBox.appendChild($attendeeBox);

    const $buttonContainer = document.createElement('div');
    $buttonContainer.classList.add('button-container');

    const $acceptButton = document.createElement('button');
    $acceptButton.setAttribute('type','button');
    $acceptButton.classList.add('btn');
    $acceptButton.classList.add('btn-dark');    
    $acceptButton.innerText = 'SAVE CHANGES'
    $acceptButton.onclick = (e) => {
        modifyEventItem(e, event, saveEventsToLocalStorage);
    }

    $buttonContainer.appendChild($acceptButton)

    $infoBox.appendChild($buttonContainer);

    return $infoBox;
};


function closeModal() {
    const $modal = document.querySelector('#event-modal');
    $modal.classList.add('not-display');
    const $container = document.querySelector('#event-content');
    $container.innerHTML = '';
};

function modifyEventItem(e, $event, saveEventsToLocalStorageCallback = () => {}) {
    const eventObj = JSON.parse($event.getAttribute('data-obj'));

    let now = (new Date()).toISOString() ;
    eventObj.updated = now;

    const newSummary = document.querySelector('#summary-modif').value;
    eventObj.summary = newSummary;

    const newDescription = document.querySelector('#description-modif').value;
    eventObj.description = newDescription;

    if(document.querySelector('.custom-radio') !== null){
        eventObj.attendees.forEach((attendee) => {
            if(attendee.self && document.querySelector('#yes-radio').checked){
                attendee.responseStatus = true;
            }
            if(attendee.self && document.querySelector('#no-radio').checked){
                attendee.responseStatus = false;
            }
        });
    }

    $event.dataset.obj = `${JSON.stringify(eventObj)}`;

    const origDay = $event.getAttribute('data-orig-start');
    const eventCreation = $event.getAttribute('data-keyword');
    saveEventsToLocalStorageCallback(origDay, eventCreation, eventObj)

    location.reload();

}


