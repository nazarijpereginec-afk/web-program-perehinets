const loader = document.getElementById("loader");
const result = document.getElementById("result");
const checkButton = document.getElementById("checkButton");
const randomButton = document.getElementById("randomButton");

function showLoader() {
    loader.style.display = "block";
    checkButton.disabled = true;
    randomButton.disabled = true;
}

function hideLoader() {
    loader.style.display = "none";
    checkButton.disabled = false;
    randomButton.disabled = false;
}

function checkNumber(num) {
    return new Promise((resolve, reject) => {
        if (num > 10) {
            resolve("Число більше 10");
        } else {
            reject("Число менше або дорівнює 10");
        }
    });
}

checkButton.addEventListener("click", function() {
    showLoader();
    result.innerHTML = "";
    let numbers = [15, 7, 20, 10];
    let promise = Promise.resolve();
    numbers.forEach(function(num) {
        promise = promise.then(function() {
            return checkNumber(num)
                .then(function(message) {
                    result.innerHTML +=
                        `<div class="success">
                            Число ${num}: ${message}
                        </div>`;
                })
                .catch(function(error) {
                    result.innerHTML +=
                        `<div class="error">
                            Число ${num}: ${error}
                        </div>`;

                });
        });
    });
    promise.finally(function() {
        hideLoader();
    });

});

function randomNumber() {
    return new Promise((resolve) => {
        let delay = Math.floor(Math.random() * 2000) + 1000;
        let number = Math.floor(Math.random() * 100) + 1;
        setTimeout(() => {
            resolve(number);
        }, delay);
    });

}

randomButton.addEventListener("click", function() {
    showLoader();
    result.innerHTML = "Очікування випадкового числа...";
    let startTime = performance.now();

    randomNumber()
        .then(function(number) {
            let endTime = performance.now();
            let time = ((endTime - startTime) / 1000).toFixed(2);
            result.innerHTML = `
                <div class="success">
                    Випадкове число: ${number}
                </div>
                <div>
                    Час виконання: ${time} секунд
                </div>
            `;
        })
        .catch(function(error) {

            result.innerHTML = `
                <div class="error">
                    Помилка: ${error}
                </div>
            `;
        })
        .finally(function() {
            hideLoader();
        });
});
