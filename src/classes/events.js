export default class Events {
    constructor(eventData, creatorData, attendeesData = []) {
        this.id = eventData.id;
        this.created = eventData.created;
        this.updated = eventData.updated;
        this.keyword = eventData.keyword;
        this.summary = eventData.summary;
        this.description = eventData.description;
        this.color = eventData.color;
        this.start = eventData.start;
        this.startDay = eventData.startDay;
        this.startHour = eventData.startHour;
        this.startMinutes = eventData.startMinutes;
        this.end = eventData.end;
        this.endDay = eventData.endDay;
        this.endHour = eventData.endHour;
        this.endMinutes = eventData.endMinutes;
        this.creator = creatorData;
        this.attendees = attendeesData;
    }

}