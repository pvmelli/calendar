import Events from '../classes/events.js'
import Creator from '../classes/creator.js'
import Attendees from '../classes/attendees.js'
import {saveEventsToLocalStorage} from '../storage/storage.js'

export function showNewEventModal() {
    const $newEventModal = document.querySelector('#new-event-modal');
    $newEventModal.classList.remove('not-display');
    $newEventModal.addEventListener('mouseover', verifyNewEvent)

    const $closeButton = document.querySelector('#close-new-event-button');
    $closeButton.addEventListener('click', closeNewEvent);

    const $addAttendees = document.querySelector('#invite-button');
    $addAttendees.addEventListener('click', addAnAttendeeBox);

    const $eraseAttendees = document.querySelector('#erase-invite-button');
    $eraseAttendees.addEventListener('click', eraseAnAttendeeBox);

    const $createEvent = document.querySelector('#create-button');
    $createEvent.addEventListener('click', createAnEvent);
}

function verifyNewEvent() {
    const $form = document.querySelector('#new-event-modal form');
    const $createButton = document.querySelector('#create-button');

    if($form.checkValidity()){
        $createButton.disabled = false;
    }else {
        $createButton.disabled = true;
    }
}

function closeNewEvent() {
    const $newEventModal = document.querySelector('#new-event-modal');
    $newEventModal.classList.add('not-display');
}

function addAnAttendeeBox() {
    const $attendeesContainer = document.querySelector('#attendees-insert');

    const $singlePerson = document.createElement('div');
    $singlePerson.classList.add('row');
    $singlePerson.classList.add('new-person');
    
    const $personId = document.createElement('input');
    $personId.required = true;
    $personId.setAttribute('type', 'text');
    $personId.setAttribute('placeholder', 'Id');
    $personId.classList.add('form-control')
    $personId.classList.add('new-person-id')
    $singlePerson.appendChild($personId)
    
    const $personName = document.createElement('input');
    $personName.required = true;
    $personName.setAttribute('type', 'text');
    $personName.setAttribute('placeholder', 'Name');
    $personName.classList.add('form-control')
    $personName.classList.add('new-person-name')
    $singlePerson.appendChild($personName)

    const $personEmail = document.createElement('input');
    $personEmail.required = true;
    $personEmail.setAttribute('type', 'email');
    $personEmail.setAttribute('placeholder', 'Email');
    $personEmail.classList.add('form-control')
    $personEmail.classList.add('new-person-email')
    $singlePerson.appendChild($personEmail)

    $attendeesContainer.appendChild($singlePerson);
}

function eraseAnAttendeeBox() {
    const $attendeesContainer = document.querySelector('#attendees-insert');
    $attendeesContainer.lastChild.remove()
}

function createAnEvent () {
    const defaultCreator = {"id": "000", "email": "you@mail.com", "displayName": "You", "self" : true}
    const creator = new Creator(defaultCreator);
    const defaultAttendeeYou = {"id": creator.id, "displayName": creator.displayName, "email": creator.email, 
    "organizer": null, "self": true, "responseStatus": null}

    const $organizerInfo = document.querySelectorAll('#organizer-info input');
    $organizerInfo.forEach(radio => {
        if(radio.checked){
            defaultAttendeeYou.organizer = Boolean(radio.value);
        }
    })

    const $attendanceInfo = document.querySelectorAll('#attendance-info input');
    $attendanceInfo.forEach(radio => {
        if(radio.checked){
            defaultAttendeeYou.responseStatus = Boolean(radio.value);
        }
    })

    const attendees = []
    attendees.push(new Attendees(defaultAttendeeYou));

    const $attendees = document.querySelectorAll('.new-person');

    $attendees.forEach((person) => {
        const personId = person.children[0].value;
        const personName = person.children[1].value;
        const personEmail = person.children[2].value;
        const attendee = {"id": personId,"displayName": personName, "email": personEmail, 
        "organizer": false, "self": false, "responseStatus": null}
        const attendeeObject = new Attendees(attendee);
        attendees.push(attendeeObject);
    })

    const newEventRandomId = (Math.random() * 10).toString().replace('.','0');
    const currentTime = new Date();
    const createdDate = currentTime.toISOString();
    const newEventKeyword = newEventRandomId + createdDate + creator.id;
    const newEventSummary = document.querySelector('#new-summary').value;
    const newEventDescription = document.querySelector('#new-description').value;
    const newEventColor = document.querySelector('#new-color').value;

    const $duration = document.querySelectorAll('.new-date');

    const startDay = `${$duration[0].value}-${$duration[1].value}-${$duration[2].value}`
    const startHour = Number($duration[3].value)
    const startHourString = startHour < 10 ? `0${startHour}` : `${startHour}`;
    const startMinutes = `${$duration[4].value}`;
    const startMinutesString = Number(startMinutes) < 10 ? `0${startMinutes}` : `${startMinutes}`;

    const startDate = (new Date(`${startDay}T${startHourString}:${startMinutesString}:00Z`)).toISOString();

    const endDay = `${$duration[5].value}-${$duration[6].value}-${$duration[7].value}`;
    const endHour = Number($duration[8].value);
    const endHourString = endHour < 10 ? `0${endHour}` : `${endHour}`;
    const endMinutes = `${$duration[9].value}`;
    const endMinutesString = Number(endMinutes) < 10 ? `0${endMinutes}` : `${endMinutes}`;

    const endDate = (new Date(`${endDay}T${endHourString}:${endMinutesString}:00Z`)).toISOString();

  
    const eventData = {"id": newEventRandomId, "created": createdDate, "updated": createdDate, "keyword": newEventKeyword,
    "summary": newEventSummary, "description": newEventDescription, "color": newEventColor,
    "start": startDate, "startDay": startDay, "startHour": startHour, "startMinutes": startMinutes,
    "end": endDate, "endDay": endDay, "endHour": endHour, "endMinutes": endMinutes,
    "status" : "pending"}

    const newEvent = new Events(eventData, creator, attendees);

    saveEventsToLocalStorage(newEvent.keyword, newEvent);

    location.reload();

};

