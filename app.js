
let currentFilter = "all";

function filterTasks(filter) {
    currentFilter = filter;
    displayTasks();
}


function searchTasks() {
    displayTasks();
}

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

    
    const searchText = document.getElementById("searchInput")
        .value.toLowerCase();

    
    const sortOrder = document.getElementById("sortOrder").value;

    const sortedTasks = tasks.map(function(task, index) {
        return { task: task, index: index };
    });

    sortedTasks.sort(function(a, b) {
        const nameA = a.task.text.toLowerCase();
        const nameB = b.task.text.toLowerCase();

        if (sortOrder === "za") {
            return nameB.localeCompare(nameA);
        }

        return nameA.localeCompare(nameB);
    });

    sortedTasks.forEach(function(entry) {
        const task = entry.task;
        const index = entry.index;

        
        if (currentFilter === "active" && task.completed) {
            return;
        }

        if (currentFilter === "completed" && !task.completed) {
            return;
        }

        
        if (!task.text.toLowerCase().includes(searchText)) {
            return;
        }
        
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

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";

        editButton.onclick = function() {
            openEditPopup(index, task.text);
        };

        item.appendChild(editButton);
        
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
    showMessagePopup("Notice", "Please enter a task!");
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
    document.getElementById("clearPopup").style.display = "flex";
}

function closeClearPopup() {
    document.getElementById("clearPopup").style.display = "none";
}

function confirmClearAll() {
    tasks = [];

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

    closeClearPopup();
    displayTasks();
}


let editingTaskIndex = null;

function openEditPopup(index, currentText) {
    editingTaskIndex = index;

    document.getElementById("editTaskInput").value = currentText;
    document.getElementById("editPopup").style.display = "flex";
}

function closeEditPopup() {
    document.getElementById("editPopup").style.display = "none";
    editingTaskIndex = null;
}

function saveEditedTask() {
    const input = document.getElementById("editTaskInput");
    const newText = input.value.trim();

    if (newText === "") {
        input.placeholder = "Please enter a task!";
        input.focus();
        return;
    }

    if (editingTaskIndex === null) {
        return;
    }

    tasks[editingTaskIndex].text = newText;

    localStorage.setItem("tasks", JSON.stringify(tasks));

    closeEditPopup();
    displayTasks();
}


function showMessagePopup(title, message) {
    document.getElementById("messageTitle").textContent = title;
    document.getElementById("messageText").textContent = message;
    document.getElementById("messagePopup").style.display = "flex";
}

function closeMessagePopup() {
    document.getElementById("messagePopup").style.display = "none";
}
