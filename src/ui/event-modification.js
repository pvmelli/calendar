import {saveEventsToLocalStorage} from '../storage/storage.js'

export function cancelEvent(e) {
    const $event = e.target.parentNode;
    $event.style.backgroundColor = '#A0A0A0';
    const eventObj = JSON.parse($event.getAttribute('data-obj'));
    eventObj.color = '#A0A0A0';
    eventObj.status = 'cancelled';
    $event.dataset.obj = `${JSON.stringify(eventObj)}`;
    $event.dataset.status = 'cancelled';

    const eventKeyword = $event.getAttribute('data-keyword');

    saveEventsToLocalStorage(eventKeyword, eventObj)
};

export function markEventAsConfirmed(e) {
    const $event = e.target.parentNode;
    $event.style.backgroundColor = '#43bbef';
    const eventObj = JSON.parse($event.getAttribute('data-obj'));
    eventObj.color = '#43bbef';
    eventObj.status = 'confirmed';
    $event.dataset.obj = `${JSON.stringify(eventObj)}`;
    $event.dataset.status = 'confirmed';

    const eventKeyword = $event.getAttribute('data-keyword');

    saveEventsToLocalStorage(eventKeyword, eventObj)
};

export function modifyEventItem(e) {
    const $infoBox = document.querySelector(`#event-information`)
    const $eventKeyword = $infoBox.getAttribute('data-selected')
    const $event = document.querySelector(`[data-keyword = "${$eventKeyword}"]`)
    const eventObj = JSON.parse($event.getAttribute('data-obj'));

    let now = (new Date()).toISOString() ;
    eventObj.updated = now;

    const newSummary = document.querySelector('#summary-modif').value;
    eventObj.summary = newSummary;

    const newDescription = document.querySelector('#description-modif').value;
    eventObj.description = newDescription;

    const durationInputs = document.querySelectorAll('#event-information .date-control');
    const newDuration = [];
    durationInputs.forEach(input => {
        if(input.value === 'at' || input.value === 'TO'){
            newDuration.push(` ${input.value} `)
        } else {
            newDuration.push(input.value)
        }        
    })

    $event.dataset.duration = newDuration.join('');

    const newStartDate = newDuration[0] + newDuration[1] + newDuration[2] + newDuration[3] + newDuration[4]
    eventObj.startDay = newStartDate;
    eventObj.startHour = Number(newDuration[6]);
    eventObj.startMinutes = newDuration[8];

    const newEndDate = newDuration[10] + newDuration[11] + newDuration[12] + newDuration[13] + newDuration[14]
    eventObj.endDay = newEndDate;
    eventObj.endHour = Number(newDuration[16]);
    eventObj.endMinutes = newDuration[18];


    if(document.querySelector('#event-information .custom-radio') !== null){
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

    const eventKeyword = $event.getAttribute('data-keyword');
    saveEventsToLocalStorage(eventKeyword, eventObj)

    location.reload();

}