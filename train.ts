function missingNumber(arr: number[]): number[] {
    const result: number[] = [];
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    for (let i = min; i <= max; i++) {
        if (!arr.includes(i)) {
            result.push(i);
        }
    }

    return result;
}

// Bu funksiya berilgan arraydan eng kichik va eng katta sonlar o'rtasidagi sonlarni tushib qolganini chiqarib beradi

console.log(missingNumber([-20, 10, 2, 20]));




// function calculate(str: string): number {
//     const numbers = str.split("+");
//     let sum: number = 0;

//     for (let i = 0; i < numbers.length; i++) {
//         sum += Number(numbers[i]);
//     }

//     return sum;
// }

// console.log(calculate("1 + 3 + 5")); 
// console.log(calculate("10 + 20"));


// function taskQ(obj: object, property: string): boolean {
//   return property in obj; 
// }

// console.log(taskQ({ name: "ethan", age: 27 }, "name"));
// console.log(taskQ({ name: "ethan", job: "develop" }, "age"));
// console.log(taskQ({ name: "ethan", age: 27, job: "branch" }, "title"));


// function objectToArray(obj: object): [string, any][] {
//     return Object.entries(obj);
// }

// console.log(objectToArray({ a: 15, b: 22 }));


// function calculateSumOfNumbers(arr: any[]): number {
//     let sum:number = 0;

//     for (let i = 0; i < arr.length; i++) {
//         if (typeof arr[i] === "number") {
//             // number stringda yozilishini sababi typeof hamisha stringda qiymat qaytaradi
//             sum += arr[i];
//         }
//     }

//     return sum;
// }

// console.log(
//     calculateSumOfNumbers([11, "10", { ethan: 10 }, false, 55])
// );



/**
*   Projects Standards:
*     - Logging Standards
*     - Naming Standards
*       function, variable, method => CAMEL
*       class => PASCAL
*       CSS => SNAKE
*
*     - Erroe Handling
*       
* */




// function palindromeCheck(str: string): boolean {
//     let reversed = "";
//
//     for (let i = str.length - 1; i >= 0; i--) {  // bu str oxiridan bitt bittalab reversed ichiga qoyib boradi
//         reversed += str[i];
//     }
//
//     return str === reversed;
// }
//
// console.log(palindromeCheck("Aziza"));
// console.log(palindromeCheck("ethan"));





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



// VALIDATION: FRONTEND VALIDATION, BACKEND VALIDATION, DATABASE VALIDATION;
// ENUM ==> Oldindan belgilangan QAT'IY Qiymatlar ketma ketligi  ( ENUMERATION )

/* Project Standards:
- Logging standards
- Naming standards:
     function, method, variable = CAMEL
     class => PASCAL
     folder => KEBAB
     CSS => SNAKE
- Error handling

*/

// Architectural pattern: MVC, Dependency Injection, MVP

// Design pattern: Middleware, Decotar

/* 
TASK L

So'zlarni ketma-ketligini buzmasdan har bir so'zni alohida teskarisiga o'girib beradigan function tuzing.

Masalan: reverseSentence("we like coding!") return "ew ekil !gnidoc" */

/*

function taskL(str) {
  return str
    .split(" ") // so'zlarga ajratadi ("") va (" ") farqi 2 si so'zga ajratdi probelga qarab
    .map((word) => word.split("").reverse().join(""))
    .join(" "); // ("") va (" " ) bu ham shunday probelga qarab qayta birlashtiradi
}

console.log(taskL("Men bugundan Burak loyihasini boshladim")); */

/* 
TASK M

Array ichidagi har bir raqam uchun raqamning o'zi va uning kvadratidan tashkil topgan object hosil qilib qaytarsin.

Masalan: getSquareNumbers([1, 2, 3]) return [{number: 1, square: 1}, ...] */

// let arr [4,2,1,6,];
/*
function taskM(arr) {
  return arr.map((num) => {
    return {
      raqam: num,
      kvadrat: num ** 2,
    };
  });
}

console.log(taskM([2, 5, 6, 8, 9]));  */

/* 
TASK N

Stringni palindrom ekanligini aniqlab true yoki false qaytarsin.

Masalan: palindromCheck("dad") return true */

/*
function taskN_palind(task: string) {
  return task === task.split("").reverse().join(""); // return qilyatganda birinchi holatidagi task ga === dan keyingi holati teng bolsa true beradi
}

console.log(taskN_palind("dad")); // true
console.log(taskN_palind("hello")); // false  */

/*
TASK O

Array ichidagi har xil qiymatlardan faqat sonlar yig'indisini hisoblab qaytarsin.

Masalan: calculateSumOfNumbers([10, "10", {son: 10}, true, 35]) return 45. */
/*

function taskO(arr: any) {
  let num = 0;
  for (let i = 0; i < arr.length; i++)
    if (typeof arr[i] === "number") {
      num += arr[i];
    }
  return num;
}

console.log(taskO([2, true, "salom", 5, { salom: "Steve" }, 70, 52, 1])); */

/* 
TASK P

Objectni nested array sifatida convert qilib qaytarsin.

Masalan: objectToArray({a: 10, b: 20}) return [["a", 10], ["b", 20]]
*/
