// Academic planner: add, complete and delete tasks (saved in the browser)
let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const errorBox = document.getElementById("task-error");
const count = document.getElementById("task-count");

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render() {
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.done) li.classList.add("done");

    const box = document.createElement("input");
    box.type = "checkbox";
    box.checked = task.done;
    box.setAttribute("aria-label", "Mark complete: " + task.text);
    box.addEventListener("change", () => toggleTask(index));

    const span = document.createElement("span");
    span.textContent = task.text;

    const del = document.createElement("button");
    del.className = "del";
    del.textContent = "Delete";
    del.addEventListener("click", () => deleteTask(index));

    li.append(box, span, del);
    list.appendChild(li);
  });

  const left = tasks.filter(t => !t.done).length;
  count.textContent = tasks.length
    ? left + " of " + tasks.length + " tasks left"
    : "No tasks yet. Add your first one above.";
}

function addTask(text) { tasks.push({ text: text, done: false }); save(); render(); }
function toggleTask(i) { tasks[i].done = !tasks[i].done; save(); render(); }
function deleteTask(i) { tasks.splice(i, 1); save(); render(); }

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text === "") {
    errorBox.textContent = "Type a task before adding it.";
    return;
  }
  errorBox.textContent = "";
  addTask(text);
  input.value = "";
  input.focus();
});

render();