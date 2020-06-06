export function loadEventsFromLocalStorage(daysArray) {
    const events = [];

    if(localStorage.length === 0) {
        throw new Error(`Events couldn't be found`);
    };

    for(let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = JSON.parse(localStorage[key])
        events.push(value);
    };

    return events;

};

export function saveEventsToLocalStorage (eventKeyword, eventData) {
    localStorage.setItem(`${eventKeyword}`, JSON.stringify(eventData));
};
