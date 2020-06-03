import {getDaysOfAWeek, getDateOfISOWeek} from './utilities/utilities.js';
import {manageCalendarCreation, createADay, manageWeeklyView} from './ui/calendar.js';
import {getEvents} from './services/service.js';
import { displayEvents, displaySingleEvent } from './ui/events.js';
import {getSelectedWeek} from './ui/general.js';


export function initialize() {

    manageWeeklyView()

    const $weekInput = document.querySelector('#week-input');
    $weekInput.addEventListener('input', manageWeeklyView)



};