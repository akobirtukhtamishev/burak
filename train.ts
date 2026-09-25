function palindromCheck(str: string): boolean {
    let reversed = "";

    for (let i = str.length - 1; i >= 0; i--) {  // bu str oxiridan bitt bittalab reversed ichiga qoyib boradi
        reversed += str[i];
    }

    return str === reversed;
}

console.log(palindromCheck("aziza"));
console.log(palindromCheck("ethan"));





// function getSquareNumbers(arr: number[]) {
//     let result = [];
//
//     for (let i = 0; i < arr.length; i++) {
//         result.push({
//             number: arr[i],
//             kvadrat: arr[i] * arr[i]
//         });
//     }
//
//     return result;
// }
//
// console.log(getSquareNumbers([55, 43, 21]));




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
