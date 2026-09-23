let userName = "Назарій";
if (true) {
    let userName = prompt("Введіть інше ім'я:");
    console.log("Глобальне ім'я:", "Назарій");
    console.log("Ім'я всередині блоку:", userName);
}

let name = prompt("Введіть ваше ім'я:");
let age = prompt("Введіть ваш вік:");
let answer = confirm(
    "Hello, " + name + "! Your age is " + age + ". Continue?"
);
if (answer) {
    alert("Welcome!");
} else {
    alert("Goodbye!");
}

let number = Number(prompt("Введіть число:"));

if (number % 2 === 0) {
    alert("Число парне");
} 
else {
    alert("Число непарне");
}