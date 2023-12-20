const fs = require('fs');

let fileData ="";
fs.readFile('sample.txt','utf-8',(err, data)=>{
    if(err) console.log(err);
    else {
        fileData = data;
        console.log(data);
        let filtered ="";
        let canInsertSpace = true;

        for(let i=0;i<fileData.length;i++){
            let ch = data.charAt(i);
            if(ch !== ' '){
                canInsertSpace = true;
                filtered+=ch;
            }
            else if(canInsertSpace){  // When ever the first space is encountered it adds it in the filtered, and ignores the rest of the spaces until a non-space character is encountered.
                filtered+=" ";
                canInsertSpace = false;
            }
        }

        console.log(filtered);
    }
});


