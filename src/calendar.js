import {showInstructions} from './ui/general.js';
import {manageWeeklyView, getWeekDays} from './ui/calendar.js';
import {getEvents} from './services/service.js';
import {showNewEventModal} from './ui/new-event.js'

export function initialize() {

    showInstructions();

    manageWeeklyView(getWeekDays, getEvents)

    const $weekInput = document.querySelector('#week-input');
    $weekInput.addEventListener('input', () => {manageWeeklyView(getWeekDays, getEvents)})

    const $newEventButton = document.querySelector('#new-event-button');
    $newEventButton.addEventListener('click', showNewEventModal)

    return 'Initialization complete';

};
