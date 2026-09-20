function reverseSentence(str: string): string {
    let words: string[] = str.split(" ");
    let result: string[] = [];

    for (let i = 0; i < words.length; i++) {
        result.push(words[i].split("").reverse().join(""));
    }

    return result.join(" ");
}

console.log(reverseSentence("my name is ethan"));
