// Завдання 3
let employees = [
    {
        name: "Олександр",
        position: "Програміст",
        salary: 30000,
        years: 3
    },
    {
        name: "Марія",
        position: "Дизайнер",
        salary: 25000,
        years: 2
    },
    {
        name: "Андрій",
        position: "Менеджер",
        salary: 35000,
        years: 5
    },
    {
        name: "Ірина",
        position: "Тестувальник",
        salary: 28000,
        years: 4
    }
];

function getAverageSalary() {

    let totalSalary = employees.reduce(function(sum, employee) {
        return sum + employee.salary;
    }, 0);

    return totalSalary / employees.length;
}

function findMostExperiencedEmployee() {

    return employees.reduce(function(mostExperienced, employee) {
        if (employee.years > mostExperienced.years) {
            return employee;
        }
        return mostExperienced;

    });
}

function showAverageSalary() {
    let averageSalary = getAverageSalary();
    document.getElementById("employeesResult").innerHTML =
        "<p>Середня зарплата: " +
        averageSalary.toFixed(2) +
        " грн</p>";
}

function showMostExperiencedEmployee() {
    let employee = findMostExperiencedEmployee();
    document.getElementById("employeesResult").innerHTML =
        "<p>Найдосвідченіший працівник: " +
        employee.name +
        "</p>" +
        "<p>Посада: " +
        employee.position +
        "</p>" +
        "<p>Зарплата: " +
        employee.salary +
        " грн</p>" +
        "<p>Досвід: " +
        employee.years +
        " років</p>";
}

// Завдання 4
let books = [
    {
        title: "Кобзар",
        author: "Тарас Шевченко",
        year: 1840,
        rating: 5,
        isRead: true
    },
    {
        title: "Тигролови",
        author: "Іван Багряний",
        year: 1944,
        rating: 4.8,
        isRead: false
    },
    {
        title: "Місто",
        author: "Валер'ян Підмогильний",
        year: 1928,
        rating: 4.5,
        isRead: true
    },
    {
        title: "Захар Беркут",
        author: "Іван Франко",
        year: 1883,
        rating: 4.7,
        isRead: false
    },
    {
        title: "Лісова пісня",
        author: "Леся Українка",
        year: 1911,
        rating: 4.9,
        isRead: false
    }
];

function getUnreadBooks() {

    return books
        .filter(function(book) {
            return book.isRead === false;
        })
        .map(function(book) {
            return book.title;
        });
}

function getBooksByAuthor(author) {
    return books
        .filter(function(book) {
            return book.author === author;
        })
        .sort(function(a, b) {
            return a.year - b.year;
        });
}

function getTopRatedBooks() {
    return books
        .filter(function(book) {
            return book.rating > 4;
        })
        .sort(function(a, b) {
            return b.rating - a.rating;
        });
}

function showUnreadBooks() {
    let unreadBooks = getUnreadBooks();
    document.getElementById("booksResult").innerHTML =
        "<p>Непрочитані книги:</p>" +
        "<p>" + unreadBooks.join("<br>") + "</p>";
}

function showBooksByAuthor() {
    let author = prompt("Введіть автора:");
    let authorBooks = getBooksByAuthor(author);
    if (authorBooks.length === 0) {

        document.getElementById("booksResult").innerHTML =
            "<p>Книг цього автора не знайдено.</p>";

        return;
    }
    let result = "<p>Книги автора " + author + ":</p>";
    authorBooks.forEach(function(book) {
        result +=
            "<p>" +
            book.title +
            " (" +
            book.year +
            ") - рейтинг " +
            book.rating +
            "</p>";
    });

    document.getElementById("booksResult").innerHTML = result;
}

function showTopRatedBooks() {
    let topBooks = getTopRatedBooks();
    let result = "<p>Книги з рейтингом вище 4:</p>";
    topBooks.forEach(function(book) {
        result +=
            "<p>" +
            book.title +
            " - рейтинг " +
            book.rating +
            "</p>";
    });
    document.getElementById("booksResult").innerHTML = result;
}
