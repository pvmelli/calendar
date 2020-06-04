export async function loadEventsFromApi (dateArray) {
    const response = await fetch ('./src/services/events.json')
    let eventsData = await response.json();

    let matchingEvents = [];

    eventsData.forEach((event) => {
        const eventStartDate = event.start.slice(0,10);
        const eventEndDate = event.end.slice(0,10);

        if (dateArray.indexOf(eventStartDate) !== -1 || dateArray.indexOf(eventEndDate) !== -1){
            event.keyword = event.created;
            event.startDay = eventStartDate;
            event.startHour = event.start.slice(11,13);
            event.startMinutes = event.start.slice(14,16);
            event.endDay = eventEndDate;
            event.endHour = event.end.slice(11,13);
            event.endMinutes = event.end.slice(14,16);
            matchingEvents.push(event);
        }
    })

    return matchingEvents;
};