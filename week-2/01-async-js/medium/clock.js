

// const currentDate = new Date();
// let currentHour = currentDate.getHours();
// let currentMinute = currentDate.getMinutes();
// let currentSecond = currentDate.getSeconds() ;

let currentHour = 0;
let currentMinute = 0;
let currentSecond = 0;
count();

function count(){
    const paddedHours = String(currentHour).padStart(2,'0');
    const paddedMinutes = String(currentMinute).padStart(2,'0');
    const paddedSeconds = String(currentSecond).padStart(2,'0');

    console.log(`${paddedHours}:${paddedMinutes}:${paddedSeconds}`);
    currentSecond++;
    if(currentSecond >= 60){
        currentSecond = 0;
        currentMinute++;
    }
    if(currentMinute>=60){
        currentMinute = 0;
        currentHour++;
    }
    if(currentHour >= 24){
        currentHour =0;
    }
    setTimeout(count, 999);
}
