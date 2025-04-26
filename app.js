
// Select DOM elements
const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const li = createTaskElement(taskText);
        taskList.appendChild(li);

        saveTask(taskText);
        taskInput.value = "";
    } else {
        alert("Please enter a task!");
    }
}

// Function to create a <li> element with delete and edit functionality
function createTaskElement(taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;

    // Delete when single-click
    li.addEventListener('click', function() {
        li.classList.add('fade-out');
        setTimeout(() => {
            li.remove();
            deleteTask(taskText);
        }, 500);
    });

    // Edit when double-click
    li.addEventListener('dblclick', function() {
        editTask(li, taskText);
    });

    return li;
}

// Function to save a task into localStorage
function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to delete a task from localStorage
function deleteTask(taskToDelete) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task !== taskToDelete);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to edit a task
function editTask(li, oldTaskText) {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = oldTaskText;
    input.classList.add('edit-input');
    
    li.textContent = '';
    li.appendChild(input);
    input.focus();

    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const newTaskText = input.value.trim();

            if (newTaskText !== "") {
                updateTask(oldTaskText, newTaskText);
                const newLi = createTaskElement(newTaskText);
                li.replaceWith(newLi);
            } else {
                alert("Task cannot be empty!");
            }
        }
    });
}

// Function to update a task in localStorage
function updateTask(oldTask, newTask) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const index = tasks.indexOf(oldTask);

    if (index !== -1) {
        tasks[index] = newTask;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
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

// Load tasks when page loads
window.addEventListener('DOMContentLoaded', loadTasks);
