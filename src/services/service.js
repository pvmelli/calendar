import {loadEventsFromApi} from '../api/api.js';

import {
    loadEventsFromLocalStorage,
    saveEventsToLocalStorage
} from '../storage/storage.js';




export async function getEvents(daysArray) {
    try {
        let eventsData = null;//loadEventsFromLocalStorage(daysArray);

        if (eventsData === null) {
            throw error;
        } else {
            return events;
        }
    }catch (e){
        try {
            const eventsData = await loadEventsFromApi(daysArray);

            //saveEventsToLocalStorage (daysArray, eventsData);
            
            return eventsData;
        }catch(e) {
            return null;
        };
    }
}
