import {showInstructions} from './ui/general.js';
import {manageWeeklyView, getWeekDays} from './ui/calendar.js';
import {manageFirstVisitToken, getEvents} from './services/service.js';
import {showNewEventModal} from './ui/new-event.js'

export function initialize() {

    const isFirstVisit = manageFirstVisitToken();

    if(isFirstVisit === 'This is the first visit'){
        showInstructions();
    }    

    manageWeeklyView(getWeekDays, getEvents)

    const $weekInput = document.querySelector('#week-input');
    $weekInput.addEventListener('input', () => {manageWeeklyView(getWeekDays, getEvents)})

    const $newEventButton = document.querySelector('#new-event-button');
    $newEventButton.addEventListener('click', showNewEventModal)

    return 'Initialization complete';

};
