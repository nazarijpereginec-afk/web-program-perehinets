const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        let text = taskInput.value.trim();

        if (text !== "") {
            addTask(text);
            taskInput.value = "";
        }

    }

});

function addTask(text) {
    let li = document.createElement("li");
    li.className = "task";

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";

    let content = document.createElement("div");
    content.className = "task-content";

    let taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = text;

    let now = new Date();

    let date = now.toLocaleDateString("uk-UA", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit"
    });

    let time = now.toLocaleTimeString("uk-UA", {
        hour: "2-digit",
        minute: "2-digit"
    });

    let taskDate = document.createElement("small");
    taskDate.className = "task-date";
    taskDate.textContent = date + ", " + time;

    content.appendChild(taskText);
    content.appendChild(taskDate);
    let deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "×";
    deleteButton.title = "Видалити завдання";

    li.appendChild(checkbox);
    li.appendChild(content);
    li.appendChild(deleteButton);

    taskList.appendChild(li);

    checkbox.addEventListener("change", function() {

        li.classList.add("completed");
        checkbox.remove();

    });

    deleteButton.addEventListener("click", function() {
        li.remove();
    });

    taskText.addEventListener("dblclick", function() {
        editTask(taskText, li);
    });

}

function editTask(taskText, li) {
    let oldText = taskText.textContent;
    let editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "edit-input";
    editInput.value = oldText;

    taskText.replaceWith(editInput);

    editInput.focus();
    editInput.select();

    editInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            let newText = editInput.value.trim();
            if (newText !== "") {
                taskText.textContent = newText;
            }
            editInput.replaceWith(taskText);

        }

        if (event.key === "Escape") {
            editInput.replaceWith(taskText);
        }
    });
}
