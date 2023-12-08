/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
    let str1array = str1.toLowerCase().split('');
    let str2array = str2.toLowerCase().split('');
    str1array.sort();
    str2array.sort();
    let res1 = str1array.join('');
    let res2 = str2array.join('');
    console.log(str2array);
    return res1 === res2;
}

isAnagram("abc!","!bac");
module.exports = isAnagram;
