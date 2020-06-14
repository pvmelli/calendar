export function loadFirstVisitToken() {
    const result = localStorage.getItem('firstVisitToken');

    if(result === null){
        throw new Error('This is the first visit')
    };

};

export function saveFirstVisitToken() {
    localStorage.setItem('firstVisitToken', JSON.stringify({"visit" : true}));

};

export function loadEventsFromLocalStorage() {
    const localStorageEntries = [];

    for(let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = JSON.parse(localStorage[key])
        localStorageEntries.push(value);
    };

    console.log(localStorageEntries);
    const events = localStorageEntries.filter(entry => entry.summary !== undefined && entry.start !== undefined);
    console.log(events);

    if(events.length === 0) {
        throw new Error(`Events couldn't be found`);
    } else {
        return events;
    }
};

export function saveEventsToLocalStorage (eventKeyword, eventData) {
    localStorage.setItem(`${eventKeyword}`, JSON.stringify(eventData));
};
