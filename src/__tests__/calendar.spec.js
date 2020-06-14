import {initialize} from '../calendar.js';
import fixture from './calendar.fixture.js'

beforeEach(() => {
    jest.spyOn(Function.prototype, 'call')
});

test("Asigna event listeners e inicializa el calendario", () => {
    document.body.innerHTML = fixture;
    Element.prototype.addEventListener = jest.fn();

    expect(initialize()).toEqual('Initialization complete');

    expect(Function.prototype.call).toHaveBeenCalledTimes(3);
    expect(document.querySelector('#calendar-container .day-table')).toBeDefined()

    expect(Element.prototype.addEventListener).toHaveBeenCalledTimes(3);
    expect(Element.prototype.addEventListener.mock.calls).toEqual([
        [expect.stringContaining("click"), expect.any(Function)],
        [expect.stringContaining("input"), expect.any(Function)],
        [expect.stringContaining("click"), expect.any(Function)],
      ]);
    

})