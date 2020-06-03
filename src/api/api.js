export async function loadEventsFromApi (dateArray) {
    const response = await fetch ('./src/services/events.json')
    let eventsData = await response.json();

    let matchingEvents = [];

    eventsData.forEach((event) => {
        const eventStartDate = event.start.slice(0,10);
        const eventEndDate = event.end.slice(0,10);
        if (dateArray.indexOf(eventStartDate) !== -1 || dateArray.indexOf(eventEndDate) !== -1){
            matchingEvents.push(event);
        }
    })

    return matchingEvents;
};