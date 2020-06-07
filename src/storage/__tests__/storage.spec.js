import {saveEventsToLocalStorage, loadEventsFromLocalStorage} from '../storage.js'
describe("Testea el funcionamiento de Local Storage", () => {
    beforeEach(() => {
        jest.spyOn(Storage.prototype, 'setItem')
    });
    
    afterEach(() => {
        localStorage.setItem.mockRestore()
    })
    
    test("Errores al cargar los eventos de Local Storage", () => {
    
        expect(() => {
            loadEventsFromLocalStorage(['2020-07-20']);
          }).toThrow(/^Events couldn't be found$/);
    
    })
    
    test("Guardando eventos en Local Storage", () => {
        saveEventsToLocalStorage('2020-06-03', {id:1});
        expect(localStorage.setItem).toHaveBeenCalledWith('2020-06-03', JSON.stringify({id:1}))
    });
    
    test("Cargando eventos de Local Storage", () => {
        saveEventsToLocalStorage('2020-06-03', {id: 1, startDay: '2020-06-04'});
    
        expect(loadEventsFromLocalStorage(['2020-06-04'])).toEqual([{id: 1, startDay: '2020-06-04'}])
    });
})
