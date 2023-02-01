// Stepbonacci
// Ex. Input Params:
//          step: 3; max: 10; ---> [0, step,]
//     Output:
//          [0, 3, 3, 6, 9]
//     Input Params:
//          step: 1; max: 5;
//     Output:
//          [0, 1, 1, 2, 3, 5]

function Stepbonacci(step, max){
    let output = [0, step]

    while(output[output.length-1] + output[output.length-2] <= max){
        output.push(output[output.length-1] + output[output.length-2]) 
    }

    console.log(output)
}

Stepbonacci(1, 3)



// Given an array of integers, give point for each integer based on the following:
//      - Add 1 point for even number
//      - Add 3 point for odd number, except number=3
//      - Add 5 point for number=3

// Ex.  input   : [1, 2, 3, 4, 5]
//      result  : 13
//      input   : [25, 30, 55]
//      result  : 7
//      input   : [3, 3, 3]
//      result  : 15

function Point(arr){
    let point = 0

    arr.forEach(value => {
        if(value % 2 === 0){
            point += 1
        }else if(value === 3){
            point += 5
        }else if(value % 2 !==0){
            point += 3
        }
    })
    console.log(point)
}

Point([1, 2, 3, 4, 5])