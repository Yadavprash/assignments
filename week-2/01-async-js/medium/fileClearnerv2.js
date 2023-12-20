const fs = require('fs');

let fileData ="";
fs.readFile('sample.txt','utf-8',(err, data)=>{
    if(err) console.log(err);
    else {
        fileData = data;
        console.log(data);
        const spaceSplit = fileData.split(/\s+/);
        console.log(spaceSplit);
        const filtered = spaceSplit.join(' ');
        const result = filtered.replace(/\. /g ,".\n");
        console.log(result);
    }
});


