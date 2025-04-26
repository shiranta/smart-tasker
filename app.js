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

// Create a <li> element with Edit and Delete buttons
function createTaskElement(taskText) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = taskText;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-btn';
    editBtn.addEventListener('click', function() {
        editTask(li, span, taskText);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', function() {
        li.classList.add('fade-out');
        setTimeout(() => {
            li.remove();
            deleteTask(taskText);
        }, 500);
    });

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    return li;
}

// Save task to localStorage
function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Delete task from localStorage
function deleteTask(taskToDelete) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task !== taskToDelete);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Edit task functionality
function editTask(li, span, oldTaskText) {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = oldTaskText;
    input.className = 'edit-input';

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.className = 'save-btn';

    // Clear existing content and add input + save button
    li.innerHTML = '';
    li.appendChild(input);
    li.appendChild(saveBtn);

    saveBtn.addEventListener('click', function() {
        const newTaskText = input.value.trim();
        if (newTaskText !== "") {
            updateTask(oldTaskText, newTaskText);

            const updatedLi = createTaskElement(newTaskText);
            li.replaceWith(updatedLi);
        } else {
            alert("Task cannot be empty!");
        }
    });
}

// Update task inside localStorage
function updateTask(oldTask, newTask) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const index = tasks.indexOf(oldTask);

    if (index !== -1) {
        tasks[index] = newTask;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

// Load tasks when page loads
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const li = createTaskElement(task);
        taskList.appendChild(li);
    });
}

// Add task on button click
addTaskBtn.addEventListener('click', addTask);

// Add task on pressing Enter key
taskInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Load tasks when the DOM is ready
window.addEventListener('DOMContentLoaded', loadTasks);

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');

    // Save preference in localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

// Event listener on Dark Mode button
darkModeToggle.addEventListener('click', toggleDarkMode);

// Check saved theme on page load
function loadTheme() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

window.addEventListener('DOMContentLoaded', loadTheme);
