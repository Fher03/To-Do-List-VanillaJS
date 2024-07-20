//Variables
const tags = document.querySelectorAll(".tag");
const input = document.getElementById("input-task");
const createBtn = document.getElementById("create-btn");
const taskList = document.getElementById("task-list");

//Inicializacion de variables
const tasksInfo = [];
let uniqueId = 0;

//Boton para crear tareas
createBtn.addEventListener("click", () => {
  if (input.value.trim() === "") {
    alert("Inserte una tarea");
  } else {
    let taskId = uniqueId++;
    tasksInfo.push({ id: taskId, name: input.value, check: false });
    renderTasks();
    resetTags();
    tags[0].classList.add("active");
    input.value = "";
  }
});

renderTasks();

//Cambia el activo de la tag al hacer click
tags.forEach((tag) => {
  tag.addEventListener("click", function () {
    resetTags();
    this.classList.add("active");
    renderTasks(this.textContent.toLowerCase());
  });
});

//Les quita la clase active a todas las tareas
function resetTags() {
  tags.forEach((el) => el.classList.remove("active"));
}

//Renderiza las tareas por filtro
function renderTasks(filter = "all") {
  // Limpiar la lista de tareas
  taskList.innerHTML = "";

  // Filtrar las tareas mediante parametro
  const filteredTasks = tasksInfo.filter((task) => {
    if (filter === "completed") return task.check;
    if (filter === "uncompleted") return !task.check;
    return true; // "all" o cualquier otro valor
  });

  // Agregar tareas filtradas a la lista
  filteredTasks.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.dataset.id = task.id;
    taskElement.classList.add("task");
    taskElement.innerHTML = `
          <input type="checkbox" ${task.check ? "checked" : ""} />
          <p class="task-name" style="text-decoration: ${
            task.check ? "line-through" : "none"
          }">${task.name}</p>
          <i class="delete-btn bx bx-trash-alt"></i>
        `;

    // Agregar manejador para el checkbox
    taskElement.querySelector("input").addEventListener("change", function () {
      const taskIndex = tasksInfo.findIndex(
        (t) => t.id === parseInt(taskElement.dataset.id)
      );
      tasksInfo[taskIndex].check = this.checked;
      renderTasks(filter);
    });

    // Agregar manejador para el botón de eliminar
    taskElement.querySelector(".delete-btn").addEventListener("click", () => {
      tasksInfo.splice(
        tasksInfo.findIndex((t) => t.id === parseInt(taskElement.dataset.id)),
        1
      );
      renderTasks(filter);
    });

    //Agregar tarea al DOM
    taskList.appendChild(taskElement);
  });
}
