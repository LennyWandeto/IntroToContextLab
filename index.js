// Your code here
function createEmployeeRecord(arr) {
    let arrtoObj = {};
    arrtoObj.firstName = arr[0];
    arrtoObj.familyName = arr[1];
    arrtoObj.title = arr[2];
    arrtoObj.timeInEvents = [];
    arrtoObj.timeOutEvents = [];
    if (typeof arr[3] === 'number') {
        arrtoObj.payPerHour = arr[3]
        return arrtoObj;
    } else {
        console.error("Last value in the array must be a numb.")
    }
}

function createEmployeeRecords(arrays) {
    let bigArrtoObj = []
    for (let arr of arrays) {
        bigArrtoObj.push(createEmployeeRecord(arr))
    }
    return bigArrtoObj;
}


function createTimeInEvent(record, dateStamp) {
    let [date, time] = dateStamp.split(' ')
    let hour = parseInt(time)

    if (parseInt(hour) < 0 || parseInt(hour) > 2359) {
         console.error("Hour must be in 24 Hour format.")
    }

    let timeInEvent = {
        type: "TimeIn",
        hour: hour,
        date: date,
    }

    record.timeInEvents.push(timeInEvent)
    return record;
}

function createTimeOutEvent(record, dateStamp) {
    let [date, time] = dateStamp.split(' ')
    let hour = parseInt(time)

    if (parseInt(hour) < 0 || parseInt(hour) > 2359) {
        console.error("Hour must be in 24 Hour format.")
    }

    let timeOutEvent = {
        type: "TimeOut",
        hour: parseInt(hour),
        date: date,
    }

    record.timeOutEvents.push(timeOutEvent)
    return record;
}
function hoursWorkedOnDate(record, date){
    const recTimeInEvent = record.timeInEvents.find(event => event.date === date)
    const recTimeOutEvent = record.timeOutEvents.find(event => event.date === date)
    if(recTimeInEvent  && recTimeOutEvent) {
          const hourTimeInEvent = recTimeInEvent.hour
          const hourTimeOutEvent = recTimeOutEvent.hour
          const hoursWorked = (hourTimeOutEvent - hourTimeInEvent)/100
          return hoursWorked
    } else{
        console.error("Date must be the same as the date in the timeInEvent and timeOutEvent.");
        return null;
    }

}

function wagesEarnedOnDate(record, date){
    const hoursWorked = hoursWorkedOnDate(record, date)
    const payPerHour = record.payPerHour
    const wagesEarned = hoursWorked * payPerHour
    return wagesEarned
}

function allWagesFor(record){
    let totalOfWages = 0;
     record.timeInEvents.forEach(event => {
        const date = event.date
        const wagesPerDate = wagesEarnedOnDate(record, date);
        totalOfWages += wagesPerDate
    })
    return totalOfWages
    
}

function calculatePayroll(allRecords){
    let everyWages = 0;
    for (let record of allRecords) {
        everyWages += allWagesFor(record)
    }
    return everyWages
}
