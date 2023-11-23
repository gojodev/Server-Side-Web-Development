/**
 * arr1 is the OG array
 * arr2 is the reversed order of arr1 (which is in your DB)
 * 
 * find the position equlant of an index in arr2 for what's in arr1
 * 
 * ans: length of OG array - position of element (NOT zero indexed)
 */


var arr2 = ['a', 'b', 'c', 'd', 'e'];
var arr1 = ['e', 'd', 'c', 'b', 'a'];
arr1.reverse();

console.log(arr1);