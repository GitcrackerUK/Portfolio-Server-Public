const {calcPercent, extractDateFromString, returnDate, calcEarnedForDay, getFinishBasic} = require('../../../routes/WorkTracker/factory.js');
const moment =require('moment')

describe(
    "Test for the method to extract integer from the string. Order of the returned integers doesn't matter at the moment.", ()=>{

        test('Should return array with numbers', () => {
            expect(extractDateFromString('12/2022')).toEqual([12, 2022]);
        });
        test('Should return array with numbers', () => {
            expect(extractDateFromString('01/2002')).toEqual([01, 2002]);
        });
        test('Should return array with numbers', () => {
            expect(extractDateFromString('01/2002')).toEqual([1, 2002]);
        });
        test('Should return array with numbers', () => {
            expect(extractDateFromString('1/2002')).toEqual([1, 2002]);
        });
        test('Should return array with numbers', () => {
            expect(extractDateFromString('2002/2')).toEqual([2002, 2]);
        });
        test('Should return array with numbers', () => {
            expect(extractDateFromString('2002/2/3')).toEqual([2002, 2, 3]);
        });
    }
);

describe(
    "It should return moment object with correct date accordingly to argument.",()=>{
        
        test('Should return moment object with correct month and year', ()=>{
            expect(returnDate([01,2022],extractDateFromString)).toEqual(moment([2022,01-1]))
        });
        test('Should return moment object with correct month and year', ()=>{
            expect(returnDate([02,2022],extractDateFromString)).toEqual(moment([2022,2-1]))
        });
        test('Should return moment object with correct day month and year', ()=>{
            expect(returnDate([01,02,2022],extractDateFromString)).toEqual(moment([2022,2-1,01]))
        });
        test('Should return moment object with correct day, month, year, hour and minute', ()=>{
            expect(returnDate([01,02,2022,22,00],extractDateFromString)).toEqual(moment([2022,2-1,01,22,00]))
        });
        test('Should return moment object with correct month and year', ()=>{
            expect(returnDate(['09/2022'],extractDateFromString)).toEqual(moment([2022,09-1]))
        });
        test('Should return moment object with correct day month and year', ()=>{
            expect(returnDate(['01/09/2022'],extractDateFromString)).toEqual(moment([2022,09-1,01]))
        });
        test('Should return moment object with correct day month and year', ()=>{
            expect(returnDate(['1/09/2022'],extractDateFromString)).toEqual(moment([2022,09-1,1]))
        });
        test('Should return moment object with correct day month and year from the string', ()=>{
            expect(returnDate('1/09/2022',extractDateFromString)).toEqual(moment([2022,09-1,1]))
        });
        test('Should return moment object with correct day, month, year, hour and minute', ()=>{
            expect(returnDate(["01/02/2022 22:00"],extractDateFromString)).toEqual(moment([2022,2-1,01,22,00]))
        });
        test('Should return moment object with correct day, month, year, hour and minute from the string', ()=>{
            expect(returnDate("01/02/2022 22:35",extractDateFromString)).toEqual(moment([2022,2-1,01,22,35]))
        });
    })
describe(
    "It should return object with calculated earnings for different start times and days of the week.",()=>{
        
        describe(
            "Monday",()=>{
                test('It should return object with night rate time and day rate time in hours.', ()=>{
                    let startTime = moment([2022,09,10,04,00])
                    expect(calcEarnedForDay(getFinishBasic,startTime )).toEqual({
                        "dayHours": 7.25,
                        "nightHours": 2,
                        "weekendHours":null,
                        "overtime":null
                        })
                });
                test('It should return object with night rate time in hours and day rate time in hours.', ()=>{
                    let startTime = moment([2022,09,10,01,00])
                    expect(calcEarnedForDay(getFinishBasic,startTime )).toEqual({
                        "dayHours": 4.25,
                        "nightHours": 5,
                        "weekendHours":null,
                        "overtime":null
                        })
                });
                test('It should return object with only day rate times in hours.', ()=>{
                    let startTime = moment([2022,09,10,07,00])
                    expect(calcEarnedForDay(getFinishBasic,startTime )).toEqual({
                        "dayHours": 9.25,
                        "nightHours": null,
                        "weekendHours":null,
                        "overtime":null
                        })
                });
                test('It should return object with only day rate times in hours.', ()=>{
                    let startTime = moment([2022,09,10,06,00])
                    expect(calcEarnedForDay(getFinishBasic,startTime )).toEqual({
                        "dayHours": 9.25,
                        "nightHours": null,
                        "weekendHours":null,
                        "overtime":null
                        })
                });
                test('It should return object with only day rate times in hours.', ()=>{
                    let startTime = moment([2022,09,10,12,00])
                    expect(calcEarnedForDay(getFinishBasic,startTime )).toEqual({
                        "dayHours": 9.25,
                        "nightHours": null,
                        "weekendHours": null,
                        "overtime":null
                        })
                });
                test('It should return object with day rate and night rate times in hours.', ()=>{
                    let startTime = moment([2022,09,10,15,00])
                    expect(calcEarnedForDay(getFinishBasic,startTime )).toEqual({
                        "dayHours": 7,
                        "nightHours":2.25,
                        "weekendHours":null,
                        "overtime":null
                        })
                });
                test('It should return object with day rate and night rate times in hours.', ()=>{
                    let startTime = moment([2022,09,10,22,00])
                    expect(calcEarnedForDay(getFinishBasic,startTime )).toEqual({
                        "dayHours": 1.25,
                        "nightHours":8,
                        "weekendHours":null,
                        "overtime":null
                        })
                });
                test('It should return object with day rate and night rate times in hours.', ()=>{
                    let startTime = moment([2022,09,10,21,00])
                    expect(calcEarnedForDay(getFinishBasic,startTime )).toEqual({
                        "dayHours": 1.25,
                        "nightHours":8,
                        "weekendHours":null,
                        "overtime":null
                        })
                });
        }),
        describe('Tuesday',()=>{
            test('It should return object with day rate and night rate times in hours.', ()=>{
                let startTime = moment([2022,09,11,00,00])
                expect(calcEarnedForDay(getFinishBasic,startTime )).toEqual({
                    "dayHours": 3.25,
                    "nightHours":6,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate times in hours.', ()=>{
                let startTime = moment([2022,09,11,06,00])
                expect(calcEarnedForDay(getFinishBasic,startTime )).toEqual({
                    "dayHours": 9.25,
                    "nightHours":null,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate times in hours.', ()=>{
                let startTime = moment([2022,09,11,09,00])
                expect(calcEarnedForDay(getFinishBasic,startTime )).toEqual({
                    "dayHours": 9.25,
                    "nightHours":null,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate times in hours.', ()=>{
                let startTime = moment([2022,09,11,12,00])
                expect(calcEarnedForDay(getFinishBasic,startTime )).toEqual({
                    "dayHours": 9.25,
                    "nightHours":null,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate and night rate times in hours.', ()=>{
                let startTime = moment([2022,09,11,15,00])
                expect(calcEarnedForDay(getFinishBasic,startTime )).toEqual({
                    "dayHours": 7,
                    "nightHours":2.25,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate and night rate times in hours.', ()=>{
                let startTime = moment([2022,09,11,21,45])
                expect(calcEarnedForDay(getFinishBasic,startTime )).toEqual({
                    "dayHours": 1.25,
                    "nightHours":8,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate and night rate times in hours.', ()=>{
                let startTime = moment([2022,09,11,22,45])
                expect(calcEarnedForDay(getFinishBasic,startTime )).toEqual({
                    "dayHours": 2,
                    "nightHours":7.25,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
        })
        describe('Wednesday',()=>{
            test('It should return object with day rate and night rate times in hours.', ()=>{
                let startTime = moment([2022,09,12,00,00])
                expect(calcEarnedForDay(getFinishBasic,startTime )).toEqual({
                    "dayHours": 3.25,
                    "nightHours":6,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate times in hours.', ()=>{
                let startTime = moment([2022,09,12,06,00])
                expect(calcEarnedForDay(getFinishBasic,startTime )).toEqual({
                    "dayHours": 9.25,
                    "nightHours":null,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate times in hours.', ()=>{
                let startTime = moment([2022,09,12,09,00])
                expect(calcEarnedForDay(getFinishBasic,startTime )).toEqual({
                    "dayHours": 9.25,
                    "nightHours":null,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate times in hours.', ()=>{
                let startTime = moment([2022,09,12,12,00])
                expect(calcEarnedForDay(getFinishBasic,startTime )).toEqual({
                    "dayHours": 9.25,
                    "nightHours":null,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate and night rate times in hours.', ()=>{
                let startTime = moment([2022,09,12,15,00])
                expect(calcEarnedForDay(getFinishBasic,startTime )).toEqual({
                    "dayHours": 7,
                    "nightHours":2.25,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate and night rate times in hours.', ()=>{
                let startTime = moment([2022,09,12,21,45])
                expect(calcEarnedForDay(getFinishBasic,startTime )).toEqual({
                    "dayHours": 1.25,
                    "nightHours":8,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate and night rate times in hours.', ()=>{
                let startTime = moment([2022,09,12,22,45])
                expect(calcEarnedForDay(getFinishBasic,startTime )).toEqual({
                    "dayHours": 2,
                    "nightHours":7.25,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
        })
        describe('Thursday',()=>{
            test('It should return object with day rate times in hours.', ()=>{
                let startTime = moment([2022,09,13,00,00])
                expect(calcEarnedForDay(getFinishBasic,startTime )).toEqual({
                    "dayHours": 3.25,
                    "nightHours":6,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate times in hours.', ()=>{
                let startTime = moment([2022,09,13,06,00])
                expect(calcEarnedForDay(getFinishBasic,startTime )).toEqual({
                    "dayHours": 9.25,
                    "nightHours":null,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate times in hours.', ()=>{
                let startTime = moment([2022,09,13,09,00])
                expect(calcEarnedForDay(getFinishBasic,startTime )).toEqual({
                    "dayHours": 9.25,
                    "nightHours":null,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate times in hours.', ()=>{
                let startTime = moment([2022,09,13,12,00])
                expect(calcEarnedForDay(getFinishBasic,startTime )).toEqual({
                    "dayHours": 9.25,
                    "nightHours":null,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate and night rate times in hours.', ()=>{
                let startTime = moment([2022,09,13,15,00])
                expect(calcEarnedForDay(getFinishBasic,startTime )).toEqual({
                    "dayHours": 7,
                    "nightHours":2.25,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate and night rate times in hours.', ()=>{
                let startTime = moment([2022,09,13,21,45])
                expect(calcEarnedForDay(getFinishBasic,startTime )).toEqual({
                    "dayHours": 1.25,
                    "nightHours":8,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate and night rate times in hours.', ()=>{
                let startTime = moment([2022,09,13,22,45])
                expect(calcEarnedForDay(getFinishBasic,startTime )).toEqual({
                    "dayHours": 2,
                    "nightHours":7.25,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
        })
        describe('Friday',()=>{
            test('It should return object with day rate and night rate times in hours.', ()=>{
                let startTime = moment([2022,09,14,00,00])
                expect(calcEarnedForDay(getFinishBasic,startTime )).toEqual({
                    "dayHours": 3.25,
                    "nightHours":6,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate and night rate times in hours.', ()=>{
                let startTime = moment([2022,09,14,06,00])
                expect(calcEarnedForDay(getFinishBasic,startTime )).toEqual({
                    "dayHours": 9.25,
                    "nightHours":null,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate and night rate times in hours.', ()=>{
                let startTime = moment([2022,09,14,09,00])
                expect(calcEarnedForDay(getFinishBasic,startTime )).toEqual({
                    "dayHours": 9.25,
                    "nightHours":null,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate and night rate times in hours.', ()=>{
                let startTime = moment([2022,09,14,12,00])
                expect(calcEarnedForDay(getFinishBasic,startTime )).toEqual({
                    "dayHours": 9.25,
                    "nightHours":null,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate and night rate times in hours.', ()=>{
                let startTime = moment([2022,09,14,14,00])
                expect(calcEarnedForDay(getFinishBasic,startTime )).toEqual({
                    "dayHours": 8,
                    "nightHours":1.25,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate and night rate times in hours.', ()=>{
                let startTime = moment([2022,09,14,15,00])
                expect(calcEarnedForDay(getFinishBasic,startTime )).toEqual({
                    "dayHours": 7,
                    "nightHours":2.25,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate and night rate times in hours.', ()=>{
                let startTime = moment([2022,09,14,21,45])
                expect(calcEarnedForDay(getFinishBasic,startTime )).toEqual({
                    "dayHours": 1.25,
                    "nightHours":8,
                    "weekendHours":null,
                    "overtime":null
                    })
            });

            (()=>{
                let day = 2;
                let night = 7.25;
               return test(`It should return object with day rate time ${day} and night rate times ${night} in hours.`, ()=>{
                    let startTime = moment([2022,09,14,22,45])
                    expect(calcEarnedForDay(getFinishBasic,startTime )).toEqual({
                        "dayHours": day,
                        "nightHours":night,
                        "weekendHours":null,
                        "overtime":null
                        })
                });
            })()
            
        })
    })


test('Should return 1.5', () => {
    expect(calcPercent(1, 50)).toBe(1.5);
});
test('Should return 12.5', () => {
    expect(calcPercent(10, 25)).toBe(12.5);
});
test('Should return 20', () => {
    expect(calcPercent(10, 100)).toBe(20);
});
test('Should return 1.01', () => {
    expect(calcPercent(1, 1)).toBe(1.01);
});
