export async function loadAllEventsFromApi () {
    const response = await fetch ('./src/services/events.json')
    let eventsData = await response.json();

    return eventsData;
};



