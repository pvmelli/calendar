import {getSelectedWeek, closeModal} from '../general.js';
import calendarFixture from '../../__tests__/calendar.fixture.js';
import modalFixture from '../../__tests__/modal.fixture.js';

test("Get week selected in week input", () => {
    document.body.innerHTML = calendarFixture;

    expect(getSelectedWeek()).toEqual(["17", "2020"])
})

test("Close modal", () => {
    document.body.innerHTML = modalFixture;

    const modal = document.querySelector('#event-modal')
    expect(modal.getAttribute('class')).toEqual(expect.not.stringContaining('not-display'))

    closeModal();
    expect(modal.getAttribute('class')).toEqual(expect.stringContaining('not-display'))
})
