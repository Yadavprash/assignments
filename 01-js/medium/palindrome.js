/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  let regexPattern = /[a-z]+/;
  let newStr ="";
  for( let i=0;i<str.length;i++){
    if(str[i].toLowerCase()>= 'a' && str[i].toLowerCase() <= 'z'){
      newStr += str[i].toLowerCase();
    }
  }
  let strArray = newStr.split('');
  let i=0,j=strArray.length -1;
  while(i <= j ){
    if(strArray[i] !== strArray[j]){
      return false;
    }
    i++;
    j--;
  }
  return true;
}
console.log(isPalindrome("!Naa aan"));
module.exports = isPalindrome;
