export default class Attendees {
    constructor(data){
        this.id = data.id;
        this.email = data.email;
        this.displayName = data.displayName;
        this.organizer = data.organizer;
        this.self = data.self;
        this.responseStatus = data.responseStatus;
    }
}