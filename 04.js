// Given an integers. Loop each integers, then sum the previous and next value
// of each integer and give points with the following rules:
// - If result of sum can modulo by 2, give 10 point
// - If result of sum cant modulo by 2, give 5 point
// - If result of sum can modulo by 2 & 3, give 15 point
// Ex. integers: 35124
//     In first loop, we have 3. 
//     Previous of int 3 is nothing, 
//     Next of 3 is 5.
//     So the sum result is 5, and we earn 5 point.

function A(int){
  let newInt = int.toString().split('').map(value => {return parseInt(value)})
  newInt.unshift(0)
  newInt.push(0)
  
  let point = 0

  for(let i=1; i < newInt.length-1; i++){
    let sum = newInt[i-1] + newInt[i+1]

    if(sum % 6 === 0){
        point += 15
    }else if(sum % 2 === 0){
        point += 10
    }else{
        point += 5
    }
  }

  console.log(point)
}

A(35124)


















/*
    Given an array of integers. Give point for each integer based on the following rules:
      - Add 100 point if integer can divided by 11 
      - Add 25 point if integer cant divided by 11
      - Return point if point over than 250

Ex. [11, 33, 25, 10, 5] ---> 100 + 100 + 25 + 25 + 25 = 275
    [11, 22, 33, 44, 55] ---> 100 + 100 + 100 = 300
*/

function B(arr){
    let point = 0
    for(let i=0; i<arr.length; i++){
        if(point >= 250) break 
        if(arr[i] % 11 === 0){
            point += 100
        }else{
            point += 25
        }
    }
    console.log(point)
}
B([11, 33, 25, 10, 5])
B([11, 22, 33, 44, 55])


// Find short length of word
// Ex. 'Hello guys' -> Result: 4
//     'Ada apa ya?' -> Result: 3
function C(str){
    let newStr = str.split(' ')
    let shortest = newStr[0].length

    for(let i=1; i<newStr.length; i++){
        if(newStr[i].length < shortest){
            shortest = newStr[i].length
        }
    }

    console.log(shortest)
}

C('Hello guys') // [Hello, guys]
C('Ada apa ya?') // [Ada, apa, ya?]