const currentDate = new Date();
let currentHour = currentDate.getHours();
let currentMinute = currentDate.getMinutes();
let currentSecond = currentDate.getSeconds() ;

//Enter initial time in 24 hrs format
// let currentHour = 23;
// let currentMinute = 59;
// let currentSecond = 55;
let meridian = 'AM';
if(currentHour >= 12 ){
    meridian = 'PM';
}
if (currentHour > 12) {
    currentHour = currentHour - 12;
}

count();

function count() {
    const paddedHours = String(currentHour).padStart(2, '0');
    const paddedMinutes = String(currentMinute).padStart(2, '0');
    const paddedSeconds = String(currentSecond).padStart(2, '0');

    console.log(`${paddedHours}:${paddedMinutes}:${paddedSeconds} ${meridian}`);
    currentSecond++;
    if (currentSecond >= 60) {
        currentSecond = 0;
        currentMinute++;
    }
    if (currentMinute >= 60) {
        currentMinute = 0;
        currentHour++;
    }
    if(currentHour > 11 && currentSecond === 0 ){
        meridian = (meridian === 'AM') ? 'PM' : 'AM';
    }
    if (currentHour > 12) {
        currentHour = 1;
    }
    setTimeout(count, 1000);
}
