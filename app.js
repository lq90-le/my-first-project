
let tasks = JSON.parse(
    localStorage.getItem("tasks") || "[]"
);

// Convert older text-only tasks to the new format
tasks = tasks.map(function(task) {
    if (typeof task === "string") {
        return {
            text: task,
            completed: false
        };
    }

    return task;
});

function displayTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach(function(task, index) {
        const item = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.onchange = function() {
            tasks[index].completed = checkbox.checked;

            localStorage.setItem(
                "tasks",
                JSON.stringify(tasks)
            );

            displayTasks();
        };

        item.appendChild(checkbox);

        const taskText = document.createElement("span");
        taskText.textContent = " " + task.text + " ";
        taskText.style.textDecoration =
            task.completed ? "line-through" : "none";

        item.appendChild(taskText);

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

    
    const completedCount = tasks.filter(function(task) {
        return task.completed;
    }).length;

    const remainingCount = tasks.length - completedCount;

    
    document.getElementById("totalTasks").textContent =
        "Total tasks: " + tasks.length;

    document.getElementById("taskProgress").textContent =
        "Completed: " + completedCount +
        " | Remaining: " + remainingCount;

    const progress = tasks.length === 0
        ? 0
        : (completedCount / tasks.length) * 100;

    document.getElementById("progressFill").style.width =
        progress + "%";
}

function addTask() {
    const input = document.getElementById("taskInput");
    const task = input.value.trim();

    if (task === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        text: task,
        completed: false
    });

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

    input.value = "";
    displayTasks();
}

localStorage.setItem("tasks", JSON.stringify(tasks));
displayTasks();


function clearAllTasks() {
    const confirmed = confirm(
        "Are you sure you want to delete all tasks?"
    );

    if (!confirmed) {
        return;
    }

    tasks = [];

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

    displayTasks();
}
