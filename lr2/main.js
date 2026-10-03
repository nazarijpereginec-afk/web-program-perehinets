// Завдання 1
function task1() {
    let userName = "Назарій";
    if (true) {
        let userName = prompt("Введіть інше ім'я:");
        console.log("Глобальне ім'я:", "Назарій");
        console.log("Ім'я всередині блоку:", userName);
        alert(
            "Глобальне ім'я: Назарій\n" +
            "Ім'я всередині блоку: " + userName
        );
    }
}

// Завдання 2
function task2() {
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
}

// Завдання 3
function task3() {
    let number = Number(prompt("Введіть число:"));
    if (number % 2 === 0) {
        alert("Число парне");
    } else {
        alert("Число непарне");
    }
}

