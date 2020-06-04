export function loadEventsFromLocalStorage(daysArray) {
    const events = [];

    daysArray.forEach((day) => {
        for(let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            let value = localStorage[key];
                if(key.slice(0,10) === day) {
                    events.push(JSON.parse(value));
                }
            } 
    })

    if(events.length !== 0){
        return events;
    } else {
        return 'failed';
    }   
};

export function saveEventsToLocalStorage (eventStartDay, eventCreation, eventData) {
    localStorage.setItem(`${eventStartDay}-${eventCreation}`, JSON.stringify(eventData));
};
