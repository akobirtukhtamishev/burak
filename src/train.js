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
