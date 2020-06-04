export function loadEventsFromLocalStorage(daysArray) {
    const events = [];

    daysArray.forEach((day) => {
        for(let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            let value = JSON.parse(localStorage[key]);
                if(value.startDay === day) {
                    events.push(value);
                }
            } 
    })

    if(events.length !== 0){
        return events;
    } else {
        return 'failed';
    }   
};

export function saveEventsToLocalStorage (eventCreation, eventData) {
    localStorage.setItem(`${eventCreation}`, JSON.stringify(eventData));
};
