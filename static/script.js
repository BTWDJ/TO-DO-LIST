// Function to add a new task
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    // Create a new list item
    const li = document.createElement("li");
    li.innerHTML = `
        <span onclick="toggleTask(this)">${taskText}</span>
        <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
    `;

    // Add the new task to the list
    taskList.appendChild(li);

    // Clear the input
    taskInput.value = "";
}

// Function to delete a task
function deleteTask(button) {
    const li = button.parentElement;
    li.remove();
}

// Function to mark task as complete
function toggleTask(task) {
    task.classList.toggle("completed");
}
