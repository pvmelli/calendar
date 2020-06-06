import {initialize} from '../calendar.js';
import fixture from './calendar.fixture.js'

beforeEach(() => {
    jest.spyOn(Function.prototype, 'call')
});

test("The initial event listeners are assigned", () => {
    document.body.innerHTML = fixture;
    Element.prototype.addEventListener = jest.fn();

    expect(initialize()).toEqual('Initialization complete');

    expect(Function.prototype.call).toHaveBeenCalledTimes(3);
    expect(document.querySelector('#calendar-container .day-table')).toBeDefined()

    expect(Element.prototype.addEventListener).toHaveBeenCalledTimes(1);
    expect(Element.prototype.addEventListener.mock.calls).toEqual([
        [expect.stringContaining("input"), expect.any(Function)],
      ]);
    

})