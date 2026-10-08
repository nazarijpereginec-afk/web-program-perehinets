let library = [
    {
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        year: 1997,
        isRead: true,
        bookInfo: function() {
            return "Назва: " + this.title +
                ", Автор: " + this.author +
                ", Рік: " + this.year +
                ", Прочитана: " + (this.isRead ? "Так" : "Ні");
        },
        markAsRead: function() {
            this.isRead = true;
        }
    },

    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        year: 1937,
        isRead: false,
        bookInfo: function() {
            return "Назва: " + this.title +
                ", Автор: " + this.author +
                ", Рік: " + this.year +
                ", Прочитана: " + (this.isRead ? "Так" : "Ні");
        },
        markAsRead: function() {
            this.isRead = true;
        }
    },
    {
        title: "1984",
        author: "George Orwell",
        year: 1949,
        isRead: true,
        bookInfo: function() {
            return "Назва: " + this.title +
                ", Автор: " + this.author +
                ", Рік: " + this.year +
                ", Прочитана: " + (this.isRead ? "Так" : "Ні");
        },
        markAsRead: function() {
            this.isRead = true;
        }
    }
];

function showBook() {
    let book = library[0];
    document.getElementById("result").innerHTML =
        "<p>" + book.bookInfo() + "</p>";

    book.isRead = !book.isRead;
    document.getElementById("result").innerHTML +=
        "<p>Після зміни:</p>" +
        "<p>" + book.bookInfo() + "</p>";
}

function showLibrary() {
    let result = "<h3>Бібліотека:</h3>";
    for (let i = 0; i < library.length; i++) {
        result += "<p>" + library[i].bookInfo() + "</p>";
    }
    document.getElementById("result").innerHTML = result;
}

function addExampleBook() {
    library.push({
        title: "The Little Prince",
        author: "Antoine de Saint-Exupery",
        year: 1943,
        isRead: false,
        bookInfo: function() {
            return "Назва: " + this.title +
                ", Автор: " + this.author +
                ", Рік: " + this.year +
                ", Прочитана: " + (this.isRead ? "Так" : "Ні");
        },
        markAsRead: function() {
            this.isRead = true;
        }
    });
    showLibrary();
}

function sortBooks() {
    library.sort(function(a, b) {
        return a.year - b.year;
    });
    showLibrary();
}

function showUnreadBooks() {
    let unreadBooks = library.filter(function(book) {
        return book.isRead === false;
    });
    let result = "<h3>Непрочитані книги:</h3>";
    for (let i = 0; i < unreadBooks.length; i++) {
        result += "<p>" + unreadBooks[i].bookInfo() + "</p>";
    }
    document.getElementById("result").innerHTML = result;
}


function findTolkienBook() {
    let book = library.find(function(book) {
        return book.author === "J.R.R. Tolkien";
    });
    if (book) {
        document.getElementById("result").innerHTML =
            "<p>" + book.bookInfo() + "</p>";
    } else {
        document.getElementById("result").innerHTML =
            "<p>Книгу не знайдено.</p>";
    }
}

function addBook() {
    let title = prompt("Введіть назву книги:");
    let author = prompt("Введіть автора:");
    let year = Number(prompt("Введіть рік видання:"));
    let isRead = confirm("Ви вже прочитали цю книгу?");
    let newBook = {
        title: title,
        author: author,
        year: year,
        isRead: isRead,
        bookInfo: function() {
            return "Назва: " + this.title +
                ", Автор: " + this.author +
                ", Рік: " + this.year +
                ", Прочитана: " + (this.isRead ? "Так" : "Ні");
        },
        markAsRead: function() {
            this.isRead = true;
        }
    };
    library.push(newBook);
    showLibrary();
}

function markBookAsRead() {
    let book = library[1];
    book.markAsRead();
    document.getElementById("result").innerHTML =
        "<p>Книгу позначено як прочитану:</p>" +
        "<p>" + book.bookInfo() + "</p>";
}

function calculateAverageYear() {
    let total = 0;
    for (let i = 0; i < library.length; i++) {
        total += library[i].year;
    }
    return total / library.length;
}

function showAverageYear() {
    let average = calculateAverageYear();
    document.getElementById("result").innerHTML =
        "<p>Середній рік видання книг: " +
        average.toFixed(2) +
        "</p>";
}

