let tasks = JSON.parse(localStorage.getItem("tasks")) || {
  todo: [],
  inprogress: [],
  done: []
};

function getDateTime() {
  const now = new Date();
  return now.toLocaleString(); // e.g. "09/02/2026, 12:45:30 PM"
}

function renderTasks() {
  ["todo", "inprogress", "done"].forEach(status => {
    const list = document.getElementById(status);
    list.innerHTML = "";
    tasks[status].forEach((taskObj, index) => {
      const div = document.createElement("div");
      div.className = "task";

      if (status === "todo") {
        // Checkbox to move task into In Progress
        div.innerHTML = `<input type="checkbox" onclick="startTask('${taskObj.text}', ${index})"> 
                         <span>${taskObj.text} (Added: ${taskObj.created})</span> 
                         <button onclick="deleteTask('${status}', ${index})">Delete</button>`;
      } else if (status === "inprogress") {
        // Checkbox to mark task as completed
        div.innerHTML = `<input type="checkbox" onclick="completeTask('${taskObj.text}', ${index})"> 
                         <span>${taskObj.text} (Started: ${taskObj.started})</span> 
                         <button onclick="deleteTask('${status}', ${index})">Delete</button>`;
      } else {
        // Done section shows completed tasks with timestamp
        div.innerHTML = `✅ <span>${taskObj.text} - Completed (Finished: ${taskObj.completed})</span> 
                         <button onclick="deleteTask('${status}', ${index})">Delete</button>`;
      }

      list.appendChild(div);
    });
  });
}

function addTask(status) {
  const task = prompt("Enter task:");
  if (task) {
    tasks[status].push({ text: task, created: getDateTime() });
    saveTasks();
    renderTasks();
  }
}

function startTask(task, index) {
  const startedTime = getDateTime();
  tasks["todo"].splice(index, 1);
  tasks["inprogress"].push({ text: task, started: startedTime });
  saveTasks();
  renderTasks();
}

function completeTask(task, index) {
  const completedTime = getDateTime();
  tasks["inprogress"].splice(index, 1);
  tasks["done"].push({ text: task, completed: completedTime });
  saveTasks();
  renderTasks();
}

function deleteTask(status, index) {
  tasks[status].splice(index, 1);
  saveTasks();
  renderTasks();
}

function clearSection(status) {
  tasks[status] = [];
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

renderTasks();

// Custom cursor movement
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", e => {
  cursor.style.left = e.pageX + "px";
  cursor.style.top = e.pageY + "px";
});
