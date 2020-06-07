import {showInstructions, getSelectedWeek, closeModal} from '../general.js';
import calendarFixture from '../../__tests__/calendar.fixture.js';
import modalFixture from '../../__tests__/modal.fixture.js';

/*beforeEach(() => {
    jest.spyOn(Storage.prototype, 'setItem')
});

afterEach(() => {
    localStorage.setItem.mockRestore()
})*/

test("Muestra las instrucciones si el Local Storage esta vacio", () => {
    document.body.innerHTML = calendarFixture;
    Element.prototype.addEventListener = jest.fn();    
    const $instructions = document.querySelector('#instructions');

    expect($instructions.getAttribute('class')).toEqual(expect.stringContaining('not-display'));

    showInstructions()

    expect($instructions.getAttribute('class')).toEqual(expect.not.stringContaining('not-display'));

    $instructions.classList.add('not-display');
    expect($instructions.getAttribute('class')).toEqual(expect.stringContaining('not-display'));
    expect(Element.prototype.addEventListener).toHaveBeenCalledTimes(1)
    expect(Element.prototype.addEventListener).toHaveBeenCalledWith(expect.stringContaining("click"), expect.any(Function))

    localStorage.setItem('test', {"test":"test"})

    expect(showInstructions()).toBe('This is not your fist time visiting this page')

    expect($instructions.getAttribute('class')).toEqual(expect.stringContaining('not-display'));
    expect(Element.prototype.addEventListener).toHaveBeenCalledTimes(1)
});


/* export function showInstructions() {

    if(localStorage.length === 0) {
        const $instructions = document.querySelector('#instructions');
        $instructions.classList.remove('not-display');
    
        const $closeInstructionsButton = document.querySelector('#close-instructions-button');
        $closeInstructionsButton.addEventListener('click', () => {$instructions.classList.add('not-display')})
    }
} */

test("Busca la semana seleccionada por el usuario", () => {
    document.body.innerHTML = calendarFixture;

    expect(getSelectedWeek()).toEqual(["17", "2020"])
})

test("Cierra el cartel con los detalles del evento", () => {
    document.body.innerHTML = modalFixture;

    const modal = document.querySelector('#event-modal')
    expect(modal.getAttribute('class')).toEqual(expect.not.stringContaining('not-display'))

    closeModal();
    expect(modal.getAttribute('class')).toEqual(expect.stringContaining('not-display'))
})
