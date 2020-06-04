import {loadEventsFromApi} from '../api/api.js';

import {
    loadEventsFromLocalStorage,
    saveEventsToLocalStorage
} from '../storage/storage.js';




export async function getEvents(daysArray) {
    try {
        let eventsData = loadEventsFromLocalStorage(daysArray)

        if (eventsData === 'failed') {
            throw error;
        } else {
            return eventsData;
        }
    }catch (e){
        try {
            const eventsData = await loadEventsFromApi(daysArray);
            eventsData.forEach((eventData) => {
                saveEventsToLocalStorage (eventData.created, eventData)
            })

            return eventsData;
        }catch(e) {
            return null;
        };
    }
}
