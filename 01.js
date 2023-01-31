// 1.
function MaxRange(first, max, stepup){
    for(let i=first; i<max; i+=stepup){
        console.log(i)
    }
}

MaxRange(2, 10, 3)



// 2. 
function ForwardAlphabet(text, move){
    let alphabet = 'abcdefghijklmnopqrstuvwxyz'
    let result  = ''
    text.split('').forEach((value, index) => { // [x, y, z]
        let indexVal = alphabet.indexOf(value) + move // x: 23 ---> 23 + 3 = 26; y: 24 ---> 24 + 3 = 27;
        if(indexVal > 25){
            let idxMove = indexVal - 26 // 26-26=0; 27-26=1
            result += alphabet[idxMove] //result += alphabet[0] = a; result += alphabet[1] = b
        }else{
            result += alphabet[indexVal]
        }
    })

    console.log(result)
}

ForwardAlphabet('xyz', 3)



// 3. 
function RemoveDuplicateNumbers(arr){
    let newNumbers = [] // [3] -> [3, 5] -> [3, 5, 1] -> [3, 5, 1, 2]

    arr.forEach(value => {
        if(!newNumbers.includes(value)){
            newNumbers.push(value)
        }
    })
    console.log(newNumbers)
}

RemoveDuplicateNumbers([3, 5, 3, 1, 2, 5])