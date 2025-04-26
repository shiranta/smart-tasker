// Select DOM elements
const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim(); // Get input value and remove extra spaces

    if (taskText !== "") { // Only add if not empty
        const li = document.createElement('li'); // Create a new <li> element
        li.textContent = taskText; // Set its text content

        // 🎯 NEW: Add event listener to delete task when clicked
        li.addEventListener('click', function() {
            // Smoothly remove task
            li.classList.add('fade-out');
            setTimeout(() => {
                li.remove(); // Actually remove after animation
            }, 500); // Match CSS transition duration
        });

        taskList.appendChild(li); // Add the new task to the task list
        taskInput.value = ""; // Clear the input field after adding
    } else {
        alert("Please enter a task!"); // If empty input, show an alert
    }
}

// Event listener for button click
addTaskBtn.addEventListener('click', addTask);

// Event listener for Enter key press
taskInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});
