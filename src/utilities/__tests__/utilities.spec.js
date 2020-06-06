import {getDaysOfAWeek, getDateOfISOWeek} from '../utilities.js'

beforeEach(() => {
    jest.fn().mockClear() 
});

test("Get starting date of an ISO Week", () => {
    Date.prototype.getDay = jest.fn()
    .mockReturnValueOnce(3).mockReturnValueOnce(3)
    .mockReturnValueOnce(6).mockReturnValueOnce(6);
    Date.prototype.getDate = jest.fn()
    .mockReturnValueOnce(11)
    .mockReturnValueOnce(8);
    const result = getDateOfISOWeek(20, 2020);

    expect(Date.prototype.getDay).toHaveBeenCalledTimes(2);
    expect(Date.prototype.getDate).toHaveBeenCalledTimes(1);
    
    expect(result).toMatchObject(new Date('2020-05-09T03:00:00.000Z'));

    const secondResult = getDateOfISOWeek(20, 2020);

    expect(Date.prototype.getDay).toHaveBeenCalledTimes(4);
    expect(Date.prototype.getDate).toHaveBeenCalledTimes(2);
    
    expect(secondResult).toMatchObject(new Date('2020-05-10T03:00:00.000Z'));
})

test("Get an array with all days of a week", () => {
    Date.prototype.getDate = jest.fn()
    .mockReturnValue(22);

    Date.prototype.getDay = jest.fn()
    .mockReturnValue(3);

    Date.prototype.setDate = jest.fn()
    .mockReturnValueOnce(1587351600000)
    .mockReturnValueOnce(1587438000000)
    .mockReturnValueOnce(1587524400000)
    .mockReturnValueOnce(1587610800000)
    .mockReturnValueOnce(1587697200000)
    .mockReturnValueOnce(1587783600000)
    .mockReturnValueOnce(1587870000000);

    const daysOfWeek = ["2020-04-20", "2020-04-21", "2020-04-22", "2020-04-23", "2020-04-24", "2020-04-25", "2020-04-26"]

    expect(getDaysOfAWeek(new Date('2020-04-20T00:00:00.000Z'))).toEqual(daysOfWeek)
})

