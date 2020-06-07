import {loadEventsFromLocalStorage} from '../storage/storage.js';

export async function getEvents(daysArray, loadAllEventsFromApiCallback = () => {}, saveEventsToLocalStorageCallback = () => {}) {
    try {
        let eventsData = loadEventsFromLocalStorage(daysArray)
        const matchingEvents = eventsData.filter(event => daysArray.indexOf(event.startDay) !== -1)

        return matchingEvents;

    }catch (e){
            const eventsData = await loadAllEventsFromApiCallback();

            eventsData.forEach((event) => {
                event = addKeyData(event);
                saveEventsToLocalStorageCallback (event.keyword, event) 
            });

            const matchingEvents = eventsData.filter(event => daysArray.indexOf(event.startDay) !== -1)

        return matchingEvents;
    }
}

export function addKeyData (event) {
    event.keyword = event.id + event.created + event.creator.id;
    event.startDay = event.start.slice(0,10);
    event.startHour = event.start.slice(11,13);
    event.startMinutes = event.start.slice(14,16);
    event.endDay = event.end.slice(0,10);
    event.endHour = event.end.slice(11,13);
    event.endMinutes = event.end.slice(14,16);
    event.status = 'pending';

    return event;
};
