// Function to display tasks
let displayTasks = () => {
  let output = document.querySelector(".output");
  output.innerHTML = "";

  let tasks = JSON.parse(localStorage.getItem("tasks"));

  if (tasks) {
    tasks.forEach((task, index) => {
      let taskDiv = document.createElement("div");
      taskDiv.classList.add("task");

      let taskText = document.createElement("text");
      taskText.textContent = task.name;

      // Add event listener to task text to toggle completion
      taskText.addEventListener("click", () => toggleTaskCompletion(index));

      let buttonDiv = document.createElement("div");

      let editButton = document.createElement("button");
      editButton.classList.add("edit");
      editButton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
      editButton.addEventListener("click", () => editTask(index));

      let deleteButton = document.createElement("button");
      deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
      deleteButton.addEventListener("click", () => deleteTask(index));

      buttonDiv.appendChild(editButton);
      buttonDiv.appendChild(deleteButton);

      taskDiv.appendChild(taskText);
      taskDiv.appendChild(buttonDiv);

      // Add completed class if the task is completed
      if (task.completed) {
        taskDiv.classList.add("completed");
      }

      output.appendChild(taskDiv);
    });
  }
};

// Function to add task
let addTask = () => {
  let taskInput = document.querySelector("input");
  let taskName = taskInput.value.trim();

  if (taskName !== "") {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ name: taskName, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
    taskInput.value = "";
  }
};

// Function to delete task
let deleteTask = (index) => {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
};

// Function to edit task
let editTask = (index) => {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  let editedTask = prompt("Edit task:", tasks[index].name);

  if (editedTask !== null) {
    tasks[index].name = editedTask.trim();
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
  }
};

// Function to toggle task completion
let toggleTaskCompletion = (index) => {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  let taskDiv = document.querySelectorAll(".task")[index];

  if (taskDiv.classList.contains("completed")) {
    taskDiv.classList.remove("completed");
    tasks[index].completed = false;
  } else {
    taskDiv.classList.add("completed");
    tasks[index].completed = true;
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Event listener for add button
document.querySelector(".add").addEventListener("click", addTask);

// Initial display of tasks
displayTasks();