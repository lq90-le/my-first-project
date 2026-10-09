
let tasks = JSON.parse(
    localStorage.getItem("tasks") || "[]"
);


function displayTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach(function(task, index) {
        const item = document.createElement("li");

        item.textContent = task + " ";

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.onclick = function() {
            tasks.splice(index, 1);

            localStorage.setItem(
                "tasks",
                JSON.stringify(tasks)
            );

            displayTasks();
        };

        item.appendChild(deleteButton);
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
