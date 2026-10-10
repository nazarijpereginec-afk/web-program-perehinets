// Завдання 1
function convertFromFahrenheit() {
    let fahrenheit = Number(
        document.getElementById("fahrenheit").value
    );
    document.getElementById("celsius").value =
        ((fahrenheit - 32) * 5 / 9).toFixed(2);
}

function convertFromCelsius() {
    let celsius = Number(
        document.getElementById("celsius").value
    );
    document.getElementById("fahrenheit").value =
        (celsius * 9 / 5 + 32).toFixed(2);
}

document.getElementById("fahrenheit").addEventListener(
    "input",
    function() {
        if (this.value !== "") {
            convertFromFahrenheit();
        } else {
            document.getElementById("celsius").value = "";
        }
    }
);

document.getElementById("celsius").addEventListener(
    "input",
    function() {
        if (this.value !== "") {
            convertFromCelsius();
        } else {
            document.getElementById("fahrenheit").value = "";
        }
    }
);

// Завдання 2
let number1;
let number2;
let score2 = 0;
let answered2 = false;
function nextQuestion2() {
    number1 = Math.floor(Math.random() * 10) + 1;
    number2 = Math.floor(Math.random() * 10) + 1;
    answered2 = false;
    document.getElementById("question2").textContent =
        "Скільки буде " + number1 + " × " + number2 + "?";
    document.getElementById("answer2").value = "";
    document.getElementById("result2").textContent = "";
}

function checkAnswer2() {
    if (answered2 || number1 === undefined) {
        return;
    }
    let answer = document.getElementById("answer2").value;
    if (answer === "") {
        document.getElementById("result2").textContent =
            "Введіть відповідь.";
        return;
    }

    answered2 = true;
    if (Number(answer) === number1 * number2) {
        score2++;
        document.getElementById("result2").textContent =
            "Правильно!";
    } else {
        document.getElementById("result2").textContent =
            "Неправильно. Правильна відповідь: " +
            number1 * number2;
    }
    document.getElementById("score2").textContent =
        "Рахунок: " + score2;
}
document.getElementById("check2").addEventListener(
    "click",
    checkAnswer2
);
document.getElementById("next2").addEventListener(
    "click",
    nextQuestion2
);

// Завдання 3
let number3a;
let number3b;
let score3 = 0;
let answered3 = true;

function nextQuestion3() {
    number3a = Math.floor(Math.random() * 10) + 1;
    number3b = Math.floor(Math.random() * 10) + 1;
    let correctAnswer = number3a * number3b;
    let answers = [correctAnswer];
    while (answers.length < 4) {
        let wrongAnswer = Math.floor(Math.random() * 100) + 1;
        if (!answers.includes(wrongAnswer)) {
            answers.push(wrongAnswer);
        }
    }
    answers.sort(function() {
        return Math.random() - 0.5;
    });
    document.getElementById("question3").textContent =
        "Скільки буде " + number3a + " × " + number3b + "?";
    let options = document.getElementById("options3");
    options.replaceChildren();
    for (let i = 0; i < answers.length; i++) {
        let label = document.createElement("label");
        let radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "answer3";
        radio.value = answers[i];
        radio.addEventListener("change", checkAnswer3);
        label.appendChild(radio);
        label.appendChild(
            document.createTextNode(" " + answers[i])
        );
        options.appendChild(label);
        options.appendChild(document.createElement("br"));
    }
    answered3 = false;
    document.getElementById("result3").textContent = "";
}

function checkAnswer3(event) {
    if (answered3) {
        return;
    }
    answered3 = true;
    let answer = Number(event.target.value);
    let correctAnswer = number3a * number3b;
    if (answer === correctAnswer) {
        score3++;
        document.getElementById("result3").textContent =
            "Правильно!";
    } else {
        document.getElementById("result3").textContent =
            "Неправильно. Правильна відповідь: " + correctAnswer;
    }
    document.getElementById("score3").textContent =
        "Рахунок: " + score3;
    let radios = document.querySelectorAll(
        'input[name="answer3"]'
    );
    radios.forEach(function(radio) {
        radio.disabled = true;
    });
}

document.getElementById("next3").addEventListener(
    "click",
    nextQuestion3
);

// Завдання 4
let imagesArray = [
    {
        path: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800",
        title: "Чоловіча футболка",
        description: "Повсякденний одяг для щоденного використання."
    },
    {
        path: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800",
        title: "Чоловіча куртка",
        description: "Верхній одяг для прохолодної погоди."
    },
    {
        path: "https://images.unsplash.com/photo-1618354691229-88d47f285158?w=800",
        title: "Чоловічий одяг",
        description: "Сучасний стиль для повсякденного образу."
    }
];

function initPhotoRotator(id, images) {
    let container = document.getElementById(id);
    let currentIndex = 0;
    let counter = document.createElement("p");
    let image = document.createElement("img");
    let title = document.createElement("h3");
    let description = document.createElement("p");
    let previous = document.createElement("a");
    let next = document.createElement("a");
    previous.textContent = "Назад";
    next.textContent = "Вперед";
    previous.className = "nav-link";
    next.className = "nav-link";
    previous.href = "#";
    next.href = "#";
    container.appendChild(counter);
    container.appendChild(previous);
    container.appendChild(next);
    container.appendChild(document.createElement("br"));
    container.appendChild(image);
    container.appendChild(title);
    container.appendChild(description);
    function showImage() {
        let current = images[currentIndex];
        counter.textContent =
            "Зображення " + (currentIndex + 1) +
            " з " + images.length;

        image.src = current.path;
        image.alt = current.title;

        title.textContent = current.title;
        description.textContent = current.description;

        previous.style.visibility =
            currentIndex === 0 ? "hidden" : "visible";
        next.style.visibility =
            currentIndex === images.length - 1
                ? "hidden"
                : "visible";
    }

    previous.addEventListener("click", function(event) {
        event.preventDefault();
        if (currentIndex > 0) {
            currentIndex--;
            showImage();
        }
    });

    next.addEventListener("click", function(event) {
        event.preventDefault();

        if (currentIndex < images.length - 1) {
            currentIndex++;
            showImage();
        }
    });
    showImage();
}

initPhotoRotator("rotator", imagesArray);

// Завдання 5
let captchaCode = "";
function initCaptcha(digitCount) {
    captchaCode = "";
    let captcha = document.getElementById("captcha");
    captcha.replaceChildren();
    document.getElementById("captchaAnswer").value = "";
    document.getElementById("captchaResult").textContent = "";
    for (let i = 0; i < digitCount; i++) {
        let digit = Math.floor(Math.random() * 10);
        captchaCode += digit;
        let span = document.createElement("span");
        span.className = "captcha-digit";
        span.textContent = digit;
        captcha.appendChild(span);
    }
}

function checkCaptcha() {
    let answer = document.getElementById("captchaAnswer").value;
    if (answer === captchaCode) {
        document.getElementById("captchaResult").textContent =
            "CAPTCHA пройдена успішно!";
    } else {
        document.getElementById("captchaResult").textContent =
            "Неправильний код. Спробуйте ще раз.";
    }
}

document.getElementById("checkCaptcha").addEventListener(
    "click",
    checkCaptcha
);

document.getElementById("newCaptcha").addEventListener(
    "click",
    function() {
        initCaptcha(5);
    }
);
initCaptcha(5);
