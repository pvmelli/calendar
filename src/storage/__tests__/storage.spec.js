import {saveEventsToLocalStorage, loadEventsFromLocalStorage} from '../storage.js'
describe("Test storage", () => {
    beforeEach(() => {
        jest.spyOn(Storage.prototype, 'setItem')
    });
    
    afterEach(() => {
        localStorage.setItem.mockRestore()
    })
    
    test("Error loading from local storage", () => {
    
        expect(() => {
            loadEventsFromLocalStorage(['2020-07-20']);
          }).toThrow(/^Events couldn't be found$/);
    
    })
    
    test("Saving to local storage", () => {
        saveEventsToLocalStorage('2020-06-03', {id:1});
        expect(localStorage.setItem).toHaveBeenCalledWith('2020-06-03', JSON.stringify({id:1}))
    });
    
    test("Successfully loading from local storage", () => {
        saveEventsToLocalStorage('2020-06-03', {id: 1, startDay: '2020-06-04'});
    
        expect(loadEventsFromLocalStorage(['2020-06-04'])).toEqual([{id: 1, startDay: '2020-06-04'}])
    });
})
