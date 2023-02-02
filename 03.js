function JajarGenjang(p, t){
    let result = ''

    for(let i=t-1; i >= 0; i--){
        let totalPrintStar = 0
        for(let j=0; j<p; j++){
            if(j >= i && totalPrintStar !== t){
                result += '*'
                totalPrintStar++
            }else{
                result += ' '
            }
        }
        result += '\n'
    }
    console.log(result)
}

JajarGenjang(10, 5)