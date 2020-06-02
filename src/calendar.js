import {getDaysOfCurrentWeek} from './utilities/utilities.js';
import {manageCalendarCreation, createADay} from './ui/calendar.js';


export function initialize() {
    const daysOfCurrentWeek = getDaysOfCurrentWeek();
    console.log(daysOfCurrentWeek);
    manageCalendarCreation(daysOfCurrentWeek, createADay)
}