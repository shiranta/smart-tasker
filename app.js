// Select DOM elements
const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim(); // Get input value and remove spaces

    if (taskText !== "") {
        const li = createTaskElement(taskText);
        taskList.appendChild(li);

        saveTask(taskText); // 🔥 Save task to localStorage
        taskInput.value = ""; // Clear input after adding
    } else {
        alert("Please enter a task!");
    }
}

// Function to create a <li> element with delete functionality
function createTaskElement(taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;

    // 🎯 When clicking a task, delete it
    li.addEventListener('click', function() {
        li.classList.add('fade-out');
        setTimeout(() => {
            li.remove();
            deleteTask(taskText); // 🔥 Delete task from localStorage
        }, 500);
    });

    return li;
}

// Function to save a task into localStorage
function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Get existing tasks or empty array
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save updated array
}

// Function to delete a task from localStorage
function deleteTask(taskToDelete) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task !== taskToDelete); // Keep all tasks except the one clicked
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save updated list
}

// Function to load all tasks when page loads
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const li = createTaskElement(task);
        taskList.appendChild(li);
    });
}

// Event listener for button click
addTaskBtn.addEventListener('click', addTask);

// Event listener for Enter key press
taskInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// 🎯 Load tasks on page load
window.addEventListener('DOMContentLoaded', loadTasks);
