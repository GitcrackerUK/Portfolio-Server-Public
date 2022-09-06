const moment = require('moment')

// const rates = {
//     currency : 'GBP',
//     basic : 14.98,
//     nights :25,
//     weekends: 33,
//     overtime: 50
// }


// function calcPercent(basic,extraRate){
//     let extra = 0 
//     extra = basic / 100 * extraRate
//     return basic + extra
// }

// const evening = calcPercent(
//     rates.basic,
//     rates.evening
//     )

// console.log('Evening rate £'+ evening)
// console.log('Evening rate £'+ evening)


// console.log(
//     {
//         currency : 'gbp',
//         basic : 14.98,
//         nights :calcPercent(rates.basic,rates.nights),
//         weekends: calcPercent(rates.basic,rates.weekends),
//         overtime: calcPercent(rates.basic,rates.overtime)
//     }
// )

// function checkPercentageFrom(main,fraction){
//     let percent;
//     let stPerce;

//     let mainDivided = main/100

//     percent = fraction / mainDivided

//     stPerce = percent.toString().slice(0,4)

//     return `${fraction} is ${stPerce} of ${main}`
// }

// let retirementPay = checkPercentageFrom(3394,141)



function extractDateFromString(str){
    let date=[];
    date.push(parseInt(str.slice(0,2)))
    date.push(parseInt(str.slice(3,str.length)))

    return date
}

function returnDate(...args){
    let payload = [];
    args.forEach((i)=>{
        if(typeof i === 'string' && args.length === 1){
            payload = extractDateFromString(args[0])
        }else if (typeof i === 'string' && args.length >=2 ){
            payload.push(parseInt(i))
        }else if (typeof i === 'number'){
            payload.push(i)
        }
    })
    return moment([payload[1],payload[0]-1])
}

function getMonthName(m){
    return  moment().month(m).format('MMMM')
}

function getNameOfWeekDay(payload,i){
    const a =  moment(payload).date(i)
    return moment(a).format('dddd')
}

function checkIN(arr,day){
    let IN = false;
    arr.forEach((i)=>{
        if(i===day){
            IN = true
        }
    })
    return IN
}

// date format month/year
function createMonth(...args){
    const DateArg = returnDate(...args)
    const month = moment(DateArg).month()+1
    const year = moment(DateArg).year()
    const monthName = getMonthName(month)
    const days = moment().daysInMonth(month)
    let calendar = { 
        name:monthName,
        month,
        year,
        numberOfDays:days,
        days:[]   
    };
    const arr = [1,2,3,4,5,7,8,9,12,23];
    for( let i = 1 ; i <= days; i++){
        calendar.days.push({
            day:i,
            in:checkIN(arr, i),
            weekDay:getNameOfWeekDay(DateArg,i),
        })
    }
    
    return calendar
}

const calendar = createMonth(9,2022)

console.log(calendar);

console.log(moment().month(9).format('MMMM'));

console.log(moment([2022,0]));