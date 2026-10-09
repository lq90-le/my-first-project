
let tasks = JSON.parse(
    localStorage.getItem("tasks") || "[]"
);

function displayTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach(function(task) {
        const item = document.createElement("li");
        item.textContent = task;
        list.appendChild(item);
    });
}

function addTask() {
    const input = document.getElementById("taskInput");
    const task = input.value.trim();

    if (task === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push(task);

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

    input.value = "";
    displayTasks();
}

displayTasks();
