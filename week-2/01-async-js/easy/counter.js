
let counter=1;
function count(countTill){
    console.log(counter);
    counter++;
    if(counter > countTill ) return;
    setTimeout(()=> count(countTill), 1000);
}
count(5);