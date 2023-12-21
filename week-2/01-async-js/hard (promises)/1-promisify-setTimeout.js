/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/
function wait(n) {
    return new Promise((resolve, reject) => {
        const res = `Resolved after ${n / 1000} Seconds.`
        setTimeout(() => {
            resolve(res);
        }, n);
    });
}
// wait(3000)
//     .then((data)=>{
//         console.log(data);
//     });
module.exports = wait;
