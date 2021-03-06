import {getDaysOfAWeek, getDateOfISOWeek} from '../utilities/utilities.js';
import {displayEvents, displaySingleEvent} from './events.js';
import {getSelectedWeek} from './general.js';
import {loadAllEventsFromApi} from '../api/api.js';
import {saveEventsToLocalStorage} from '../storage/storage.js'

export function getWeekDays() {
    const selectedWeek = getSelectedWeek();
    const date = getDateOfISOWeek(selectedWeek[0], selectedWeek[1]);
    const weekDays = getDaysOfAWeek(date);

    return weekDays;
};

export function manageWeeklyView(getWeekDaysCallback = () => {}, getEventsCallback = () => {}) {
    const weekDays = getWeekDaysCallback();

    manageCalendarCreation(weekDays, createADay)

    getEventsCallback(weekDays, loadAllEventsFromApi, saveEventsToLocalStorage).then((matchingEvents) => {
        displayEvents(matchingEvents, displaySingleEvent);
    });

    return 'Managed successfully';
};

export function manageCalendarCreation(daysArray = [], createADayCallback = () => {}) {
    const $calendarContainer = document.querySelector('#calendar-container');
    $calendarContainer.innerHTML = '';

    daysArray.forEach((day) => {
        const $calendarDay = createADayCallback(day);
        $calendarContainer.appendChild($calendarDay);
    })
}

export function createADay(day) {
    const $dayContainer = document.createElement('table');
    $dayContainer.classList.add('day-table')
    $dayContainer.classList.add('table-striped')

    const $dayContainerHeader = document.createElement('thead');
    $dayContainerHeader.classList.add('thead-dark');

    const $dayContainerHeaderContent = document.createElement('th');
    $dayContainerHeaderContent.innerText = day;
    $dayContainerHeaderContent.setAttribute('colspan', '4');

    $dayContainerHeader.appendChild($dayContainerHeaderContent)

    const $dayContainerBody = document.createElement('tbody');
    for(let i = 0; i <= 11; i++){
        const row = document.createElement('tr')
        const firstHourContainer = document.createElement('th');
        firstHourContainer.innerText = i;
        const firstEventContainer = document.createElement('td');
        firstEventContainer.dataset.hour = `${day}-${i}`;
        row.appendChild(firstHourContainer);
        row.appendChild(firstEventContainer);

        const secondHourContainer = document.createElement('th');
        secondHourContainer.innerText = i + 12;
        const secondEventContainer = document.createElement('td');
        secondEventContainer.dataset.hour = `${day}-${i + 12}`;
        row.appendChild(secondHourContainer);
        row.appendChild(secondEventContainer);
        
        $dayContainerBody.appendChild(row);
    }

    $dayContainer.appendChild($dayContainerHeader)
    $dayContainer.appendChild($dayContainerBody)

    return $dayContainer;
};