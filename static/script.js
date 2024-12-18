// Function to add a new task via AJAX
// Function to add a new task via AJAX
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    fetch('/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `task_name=${encodeURIComponent(taskText)}`
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => {
                console.error("Error response:", err);
                throw new Error(err.error || "Failed to add task.");
            });
        }
        return response.json();
    })
    .then(data => {
        const taskList = document.getElementById("taskList");
        const newTask = document.createElement("li");
        newTask.id = `task-${data.task_id}`;
        newTask.innerHTML = `
            <span>${data.task_name}</span>
            <button class="delete-btn" onclick="deleteTask(${data.task_id})">Delete</button>
        `;
        taskList.appendChild(newTask);

        taskInput.value = ""; // Clear the input field
    })
    .catch(error => {
        console.error("An error occurred:", error);
        alert("An error occurred while adding the task.");
    });
}


// Function to delete a task via AJAX
function deleteTask(taskId) {
    fetch(`/delete/${taskId}`, { method: 'POST' })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to delete task.");
            }
            return response.json();
        })
        .then(data => {
            if (data.status === "success") {
                // Remove the task from the UI
                const taskElement = document.getElementById(`task-${taskId}`);
                taskElement.remove();
            }
        })
        .catch(error => {
            console.error(error);
            alert("An error occurred while deleting the task.");
        });
}
