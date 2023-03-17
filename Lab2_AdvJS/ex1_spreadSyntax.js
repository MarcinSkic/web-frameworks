function sumNumbers(...numbers){
    message = "Suma liczb: ";
    sum = 0

    for(let i = 0; i < numbers.length; i++){
        message += numbers[i] + (i+1 != numbers.length ? ',' : ' ');
        sum += numbers[i];
    }
    
    return `${message}wynosi ${sum}`; 
}

console.log(sumNumbers(4,6,2));