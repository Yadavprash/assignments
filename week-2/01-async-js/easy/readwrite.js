const fs = require('fs');


const data = `In 100 years, humanity lives in fear of the Titans.
A race of beasts who take the appearance of humans but are much larger and lack sexual organs.
Their only purpose is to feast upon humans. 
However, humanity barricaded themselves in three 50-meter walls to protect themselves from the terror of the Titans.`

const fileName = 'aot.txt';
fs.writeFile(fileName,data,(err)=>{
    if(err) console.log(err);
    else console.log(`Wrote to file ${fileName}.`);
});
fs.readFile('aot.txt','utf-8',(err, data)=>{
    if(err) console.log(err);
    else console.log(data);
});
let j=0;
for(let i=0;i<1000000000;i++){
    j++;
}
