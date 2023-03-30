function fibonacci(num) {
    let a = 1;
    let b = 0;
    let temp;
    while (num >= 0) {
        temp = a;
        a += b;
        b = temp;
        // eslint-disable-next-line no-param-reassign
        num -= 1;
    }
    return b;
}
console.log(fibonacci(7));
