// Architectural pattern: MVC, Dependency Injection, MVP

// MVC = MODEL VIEW CONTROLLER

// Design pattern: Middleware, Decotar

/* 
TASK L

So'zlarni ketma-ketligini buzmasdan har bir so'zni alohida teskarisiga o'girib beradigan function tuzing.

Masalan: reverseSentence("we like coding!") return "ew ekil !gnidoc" */

function taskL(str) {
  return str
    .split(" ") // so'zlarga ajratadi ("") va (" ") farqi 2 si so'zga ajratdi probelga qarab
    .map((word) => word.split("").reverse().join(""))
    .join(" "); // ("") va (" " ) bu ham shunday probelga qarab qayta birlashtiradi
}

console.log(taskL("Men bugundan Burak loyihasini boshladim"));

/*
TASK M

Array ichidagi har bir raqam uchun raqamning o'zi va uning kvadratidan tashkil topgan object hosil qilib qaytarsin.

Masalan: getSquareNumbers([1, 2, 3]) return [{number: 1, square: 1}, ...] */

// let arr [4,2,1,6,];

function taskM(arr) {
  return arr.map((num) => {
    return {
      raqam: num,
      kvadrat: num ** 2,
    };
  });
}

console.log(taskM([2, 5, 6, 8, 9]));
