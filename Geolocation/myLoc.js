let watchId = null;

let ourCoords = {
    latitude: 48.94321,
    longitude: 24.73380
};

document.addEventListener('DOMContentLoaded', getMyLocation);

function getMyLocation() {
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(
            displayLocation,
            displayError
        );

        let watchButton = document.getElementById("watch");
        watchButton.onclick = watchLocation;

        let clearWatchButton = document.getElementById("clearWatch");
        clearWatchButton.onclick = clearWatch;

    } else {
        alert("Ваш браузер не підтримує Geolocation API");
    }
}

function displayLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let div = document.getElementById("location");

    div.innerHTML = `Ваша широта: ${latitude},
        Довгота: ${longitude}`;

    div.innerHTML += ` (Точність: ${position.coords.accuracy} метрів)`;

    let km = computeDistance(position.coords, ourCoords);

    let distance = document.getElementById("distance");

    distance.innerHTML =
        `Відстань до коледжу: ${km.toFixed(2)} км`;
}

function displayError(error) {
    const errorTypes = {
        0: "Невідома помилка",
        1: "Доступ заборонено користувачем",
        2: "Місцезнаходження недоступне",
        3: "Час очікування вичерпано"
    };

    let errorMessage = errorTypes[error.code];

    if (error.code === 0 || error.code === 2) {
        errorMessage += ": " + error.message;
    }

    let div = document.getElementById("location");
    div.innerHTML = errorMessage;
}

function computeDistance(startCoords, destCoords) {
    let startLatRads = degreesToRadians(startCoords.latitude);
    let startLongRads = degreesToRadians(startCoords.longitude);

    let destLatRads = degreesToRadians(destCoords.latitude);
    let destLongRads = degreesToRadians(destCoords.longitude);

    let Radius = 6371;

    let distance = Math.acos(
        Math.sin(startLatRads) * Math.sin(destLatRads) +
        Math.cos(startLatRads) * Math.cos(destLatRads) *
        Math.cos(startLongRads - destLongRads)
    ) * Radius;

    return distance;
}

function degreesToRadians(degrees) {
    let radians = degrees * Math.PI / 180;
    return radians;
}

function watchLocation() {
    if (watchId === null) {
        watchId = navigator.geolocation.watchPosition(
            displayLocation,
            displayError
        );
    }
}

function clearWatch() {
    if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
    }
}
