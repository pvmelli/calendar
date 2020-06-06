import {closeModal} from "./general.js";
import {cancelEvent, markEventAsConfirmed, modifyEventItem} from './event-modification.js';
import Events from '../classes/events.js'
import Creator from '../classes/creator.js'
import Attendees from '../classes/attendees.js'

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
    $event.dataset.keyword = `${event.keyword}`
    $event.dataset.origStart = `${event.start}`
    $event.dataset.duration = `${event.startDay} at ${event.startHour}:${event.startMinutes} TO ${event.endDay} at ${event.endHour}:${event.endMinutes}`
    $event.dataset.status = 'pending';
    $event.dataset.obj = `${JSON.stringify(event)}`;

    displayEventButtons($event)    

    $eventContainer.appendChild($event);
};

function displayEventButtons($event) {
    const $doneButton = document.createElement('a');
    $doneButton.classList.add('fa')
    $doneButton.classList.add('fa-check-square-o')
    $doneButton.addEventListener('click', markEventAsConfirmed);

    $event.appendChild($doneButton);

    const $cancelButton = document.createElement('a');
    $cancelButton.classList.add('fa')
    $cancelButton.classList.add('fa-trash-o')
    $cancelButton.addEventListener('click', cancelEvent);

    $event.appendChild($cancelButton);

    const $modifyButton = document.createElement('a');
    $modifyButton.classList.add('fa')
    $modifyButton.classList.add('fa-cog')
    $modifyButton.addEventListener('click', displayEventDetails);

    $event.appendChild($modifyButton);
};

export function displayEventDetails(e) {
    const $modal = document.querySelector('#event-modal');
    $modal.classList.remove('not-display');
    const $closeButton = document.querySelector('#close-modal-button')
    $closeButton.addEventListener('click', closeModal)

    const $container = document.querySelector('#event-content');
    $container.innerHTML = '';

    const $eventInfoBox = createEventInfoBox(e.target.parentNode);

    $container.appendChild($eventInfoBox)
}

export function createEventInfoBox(event) {
    const $infoBox = document.createElement('form');
    $infoBox.setAttribute('id', 'event-information')
    $infoBox.dataset.selected = event.dataset.keyword;

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

    const $date = document.createElement('div');
    $date.classList.add('duration-container')
    const duration = `${event.getAttribute('data-duration')}`
    const divisions = duration.split(/ |(:)|(-)/);
    const result = divisions.filter(part => part !== undefined);

    const inputNodes = []

    result.forEach((part) => {
        if(Number.isInteger(parseInt(part))){
            const inputHTML = `<input type="number" class="form-control date-control" value="${part}">`
            inputNodes.push(inputHTML);
        } else {
            const inputHTML = `<input class="date-control date-non" value="${part}" disabled>`
            inputNodes.push(inputHTML);
        }
    })
    $date.innerHTML = inputNodes.join('');

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

    if (eventObj.creator.self === true){
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
            const isAttending = person.responseStatus ? `<p>They'll go!</p>` : person.responseStatus === false ? `<p>They rather stay home</p>` : `<p>Haven't responded</p>` 

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
    $acceptButton.addEventListener('click', modifyEventItem);

    $buttonContainer.appendChild($acceptButton)

    $infoBox.appendChild($buttonContainer);

    return $infoBox;
};




