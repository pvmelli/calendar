import {getDaysOfCurrentWeek} from './utilities/utilities.js';
import {manageCalendarCreation, createADay} from './ui/calendar.js';
import {getEvents} from './services/service.js';
import { displayEvents } from './ui/events.js';


export function initialize() {
    const daysOfCurrentWeek = getDaysOfCurrentWeek();
    manageCalendarCreation(daysOfCurrentWeek, createADay)
    getEvents(daysOfCurrentWeek).then((matchingEvents) => {
        displayEvents(matchingEvents);
    })
};