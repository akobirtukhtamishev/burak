function getSquareNumbers(arr: number[]) {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        result.push({
            number: arr[i],
            kvadrat: arr[i] * arr[i]
        });
    }

    return result;
}

console.log(getSquareNumbers([55, 43, 21]));




// function reverseSentence(str: string): string {
//     let words: string[] = str.split(" ");
//     let result: string[] = [];
//
//     for (let i = 0; i < words.length; i++) {
//         result.push(words[i].split("").reverse().join(""));
//     }
//
//     return result.join(" ");
// }
//
// console.log(reverseSentence("my name is ethan"));
