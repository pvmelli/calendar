import fixture from '../../__tests__/calendar.fixture.js';
import {showNewEventModal, closeNewEvent, verifyNewEvent,
    addAnAttendeeBox, eraseAnAttendeeBox, createAnEvent} from '../new-event.js';

describe ("Testea el uso del modal para creación de eventos", () => {
    document.body.innerHTML = fixture;

    test("Abre y cierra el modal", () => {
        const $newEventModal = document.querySelector('#new-event-modal');
        expect($newEventModal.getAttribute('class')).toEqual(expect.stringContaining('not-display'));

        showNewEventModal();

        expect($newEventModal.getAttribute('class')).toEqual(expect.not.stringContaining('not-display'));

        closeNewEvent();

        expect($newEventModal.getAttribute('class')).toEqual(expect.stringContaining('not-display'));
    });

    test("Abre el modal y agrega event listeners", () => {
        Element.prototype.addEventListener = jest.fn();
        const $newEventModal = document.querySelector('#new-event-modal');
        expect($newEventModal.getAttribute('class')).toEqual(expect.stringContaining('not-display'));

        showNewEventModal();

        expect($newEventModal.getAttribute('class')).toEqual(expect.not.stringContaining('not-display'));

        expect(Element.prototype.addEventListener).toHaveBeenCalledTimes(5);
        expect(Element.prototype.addEventListener.mock.calls).toEqual([
            [expect.stringContaining("mouseover"), expect.any(Function)],
            [expect.stringContaining("click"), expect.any(Function)],
            [expect.stringContaining("click"), expect.any(Function)],
            [expect.stringContaining("click"), expect.any(Function)],
            [expect.stringContaining("click"), expect.any(Function)],
          ]);

    });

    test("Testea el método de verificación del formulario", () => {
        const $createButton = document.querySelector('#create-button');
        expect($createButton.getAttribute('disabled')).toBeDefined();

        verifyNewEvent();
        expect($createButton.getAttribute('disabled')).toBeDefined();

        const $organizerInfo = document.querySelectorAll('#organizer-info input');
        $organizerInfo[0].checked = true;

        const $attendanceInfo = document.querySelectorAll('#attendance-info input');
        $attendanceInfo[0].checked = true;

        const newEventSummary = document.querySelector('#new-summary');
        newEventSummary.value = "Test summary";
        const newEventDescription = document.querySelector('#new-description');
        newEventDescription.value = "Test description";

        verifyNewEvent();

        expect($createButton.getAttribute('disabled')).toBeNull();

    });

    test("Testea el agregado y borrado de los campos para invitados en el formulario", () => {
        const $attendeesContainer = document.querySelector('#attendees-insert');
        expect($attendeesContainer.getAttribute('innerHTML')).toBeNull();
        expect(document.querySelectorAll('.new-person')).toHaveLength(0);
        expect(document.querySelectorAll('.new-person-id')).toHaveLength(0);
        expect(document.querySelectorAll('.new-person-name')).toHaveLength(0);
        expect(document.querySelectorAll('.new-person-email')).toHaveLength(0);

        addAnAttendeeBox();

        expect($attendeesContainer.getAttribute('innerHTML')).toBeDefined();
        expect(document.querySelectorAll('.new-person')).toHaveLength(1);
        expect(document.querySelectorAll('.new-person-id')).toHaveLength(1);
        expect(document.querySelectorAll('.new-person-name')).toHaveLength(1);
        expect(document.querySelectorAll('.new-person-email')).toHaveLength(1);

        addAnAttendeeBox();

        expect($attendeesContainer.getAttribute('innerHTML')).toBeDefined();
        expect(document.querySelectorAll('.new-person')).toHaveLength(2);
        expect(document.querySelectorAll('.new-person-id')).toHaveLength(2);
        expect(document.querySelectorAll('.new-person-name')).toHaveLength(2);
        expect(document.querySelectorAll('.new-person-email')).toHaveLength(2);

        eraseAnAttendeeBox();
        eraseAnAttendeeBox();

        expect($attendeesContainer.getAttribute('innerHTML')).toBeNull();
        expect(document.querySelectorAll('.new-person')).toHaveLength(0);
        expect(document.querySelectorAll('.new-person-id')).toHaveLength(0);
        expect(document.querySelectorAll('.new-person-name')).toHaveLength(0);
        expect(document.querySelectorAll('.new-person-email')).toHaveLength(0);
    });

});

describe ("Testea la creación de un evento", () => {

    beforeEach(() => {
        jest.spyOn(Storage.prototype, 'setItem')
        
        const { location } = window;
        delete window.location;
        window.location = { reload: jest.fn() };
    });
    
    afterEach(() => {
        localStorage.setItem.mockRestore()
    })
    

    document.body.innerHTML = fixture;

    test("Ejemplo 1: evento sin invitados excepto el usuario, no siendo el organizador y sin responder si asiste", () => {
        const $organizerInfo = document.querySelectorAll('#organizer-info input');
        $organizerInfo[1].checked = true;
        const newEventSummary = document.querySelector('#new-summary');
        newEventSummary.value = "Test summary";
        const newEventDescription = document.querySelector('#new-description');
        newEventDescription.value = "Test description";

        createAnEvent();

        expect(localStorage.setItem).toHaveBeenCalled();

    });

    test("Ejemplo 2: evento con un invitado, siendo el organizador, respondiendo que asiste", () => {
        const $organizerInfo = document.querySelectorAll('#organizer-info input');
        $organizerInfo[0].checked = true;
        const $attendanceInfo = document.querySelectorAll('#attendance-info input');
        $attendanceInfo[0].checked = true;
        const newEventSummary = document.querySelector('#new-summary');
        newEventSummary.value = "Test summary";
        const newEventDescription = document.querySelector('#new-description');
        newEventDescription.value = "Test description";

        addAnAttendeeBox();
        const $attendeeIdInput = (document.querySelectorAll('.new-person-id'))[0];
        $attendeeIdInput.value = '123';
        const $attendeeNameInput = (document.querySelectorAll('.new-person-name'))[0];
        $attendeeNameInput.value = 'Nathan';
        const $attendeeEmailInput = (document.querySelectorAll('.new-person-email'))[0];
        $attendeeEmailInput.value = 'nathan@gmail.com';


        createAnEvent();
    });

    test("Ejemplo 3: evento con un invitado, no siendo el organizador, respondiendo que no asiste", () => {
        const $organizerInfo = document.querySelectorAll('#organizer-info input');
        $organizerInfo[1].checked = true;
        const $attendanceInfo = document.querySelectorAll('#attendance-info input');
        $attendanceInfo[1].checked = true;
        const newEventSummary = document.querySelector('#new-summary');
        newEventSummary.value = "Test summary";
        const newEventDescription = document.querySelector('#new-description');
        newEventDescription.value = "Test description";

        addAnAttendeeBox();
        const $attendeeIdInput = (document.querySelectorAll('.new-person-id'))[0];
        $attendeeIdInput.value = '123';
        const $attendeeNameInput = (document.querySelectorAll('.new-person-name'))[0];
        $attendeeNameInput.value = 'Nathan';
        const $attendeeEmailInput = (document.querySelectorAll('.new-person-email'))[0];
        $attendeeEmailInput.value = 'nathan@gmail.com';


        createAnEvent();

    });

    test("Ejemplo 4: evento de 02:05 a 03:06", () => {
        const $duration = document.querySelectorAll('.new-date');
        $duration[3].value = '2';
        $duration[4].value = '5';
        $duration[8].value = '3';
        $duration[9].value = '6';

        createAnEvent();
    })

    test("Ejemplo 5: evento de 16:40 a 17:50", () => {
        const $duration = document.querySelectorAll('.new-date');
        $duration[3].value = '16';
        $duration[4].value = '40';
        $duration[8].value = '17';
        $duration[9].value = '50';

        createAnEvent();
    });
});

/* */

