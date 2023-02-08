import Modal from "./Modal.js";
import ModalHandler from "./ModalHandler.js";
import Library from "./Library.js";
const projectModal = new Modal("Project").createUi();
const todoModal = new Modal("Todo").createUi();
//implementar localStorage, arreglar edición de fechas.
function markComplete(container, item) {
  if (container.classList.contains("incomplete") && item.completed === false) {
    container.classList.toggle("incomplete");
    container.classList.add("complete");
    item.completed = true;
    if (container.parentNode.classList.contains("deployed-project-container")) {
      item.todos.forEach((child) => {
        child.completed = true;
      });
      deployProject(item.title);
    } else {
      deployProject(item.parentProject);
    }
  } else {
    container.classList.toggle("complete");
    container.classList.add("incomplete");
    item.completed = false;
    if (container.parentNode.classList.contains("deployed-project-container")) {
      item.todos.forEach((child) => {
        child.completed = false;
      });
      deployProject(item.title);
    } else {
      deployProject(item.parentProject);
    }
  }
}
function deleteToDo(project, todo) {
  project.todos.splice(project.todos.indexOf(todo), 1);
  deployProject(project.title);
}
function deleteProject(project) {
  Library.getProjects().splice(Library.getProjects().indexOf(project), 1);
  document.querySelector("main").replaceChildren();
  updateProjectTitleLists();
}
function editTodo(parentProject, todo, todoTagChild) {
  const propToEdit = Object.keys(todo).find((val) => val === todoTagChild.id);
  if (propToEdit) {
    todoTagChild.setAttribute("contenteditable", "true");
    todoTagChild.addEventListener("blur", () => {
      todo[propToEdit] = todoTagChild.textContent;
      todoTagChild.setAttribute("contenteditable", "false");
      deployProject(parentProject.title);
    });
  }
}
function deployProject(title = "") {
  const main = document.querySelector("main");
  main.replaceChildren();
  if (Library.getProjects().length > 0) {
    const currentProject = Library.getProjects().find((p) => p.title === title);
    const projectContainer = document.createElement("div");
    const projectHeader = document.createElement("div");
    const projectTitle = document.createElement("h2");
    const projectBody = document.createElement("div");
    const deleteP = document.createElement("button");
    const done = document.createElement("button");
    const projectToDos = currentProject.todos;
    done.textContent = "Done";
    done.classList.add("done");
    done.addEventListener("click", () => {
      markComplete(projectHeader, currentProject);
    });
    deleteP.textContent = "Del";
    deleteP.classList.add("delete-item");
    deleteP.addEventListener("click", () => {
      deleteProject(currentProject);
    });
    projectContainer.classList.add("deployed-project-container");
    currentProject.completed === false
      ? projectHeader.classList.add("incomplete")
      : projectHeader.classList.add("complete");
    projectContainer.id = currentProject.title;
    projectContainer.append(projectHeader, projectBody);
    projectHeader.append(projectTitle, deleteP, done);
    projectHeader.classList.add("deployed-project-header");
    projectTitle.textContent = currentProject.title;
    projectBody.classList.add("deployed-project-body");
    projectToDos.forEach((t) => {
      const todoContainer = document.createElement("div");
      const todoTitle = document.createElement("h3");
      const todoDescription = document.createElement("p");
      const todoDueDate = document.createElement("input");
      const todoPriority = document.createElement("span");
      const deleteTD = document.createElement("button");
      const doneT = document.createElement("button");
      doneT.textContent = "Done";
      doneT.classList.add("done");
      doneT.addEventListener("click", () => {
        markComplete(todoContainer, t);
      });
      deleteTD.classList.add("delete-item");
      deleteTD.textContent = "Del";
      deleteTD.addEventListener("click", () => {
        deleteToDo(currentProject, t);
      });
      todoTitle.setAttribute("id", "title");
      todoTitle.textContent = t.title;
      todoDescription.setAttribute("id", "description");
      todoDescription.textContent = t.description;
      todoDueDate.setAttribute("type", "date");
      todoDueDate.value = t.dueDate;
      if (t.priority === "high") {
        todoPriority.classList.add("high");
      }
      todoPriority.textContent = t.priority;
      todoContainer.classList.add("todo-container");
      t.completed === false
        ? todoContainer.classList.add("incomplete")
        : todoContainer.classList.add("complete");
      todoContainer.append(
        todoTitle,
        todoDescription,
        todoDueDate,
        todoPriority,
        deleteTD,
        doneT
      );
      Array.from(todoContainer.childNodes).forEach((child) => {
        child.addEventListener("dblclick", () => {
          editTodo(currentProject, t, child);
        });
      });
      projectBody.append(todoContainer);
    });
    main.append(projectContainer);
  }
}
function updateProjectTitleLists() {
  const titles = document.getElementById("project-titles");
  const projectList = document.querySelector(".projects");
  titles.replaceChildren();
  projectList.replaceChildren();
  if (Library.getProjectTitles().length > 0) {
    Library.getProjectTitles().forEach((pt) => {
      const option = document.createElement("option");
      option.setAttribute("value", pt);
      option.textContent = pt;
      titles.append(option);
      const title = document.createElement("p");
      title.classList.add("project-title");
      title.addEventListener("click", () => {
        deployProject(pt);
      });
      title.textContent = pt;
      projectList.append(title);
    });
  }
}
function handleModalDisplay() {
  const openCloseModalButtons = Array.from(
    document.querySelectorAll(".open-close-modal")
  );
  openCloseModalButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.id === "open-project-modal" || btn.id === "close-project-modal") {
        ModalHandler.toggleModalDisplay(projectModal);
      } else if (
        btn.id === "open-todo-modal" ||
        btn.id === "close-todo-modal"
      ) {
        ModalHandler.toggleModalDisplay(todoModal);
      }
    });
  });
}
function handleItemCreation() {
  const createModalButtons = Array.from(
    document.querySelectorAll(".create-modal")
  );
  createModalButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.id === "create-project") {
        if (Library.createNewProject(ModalHandler.getProjectInfo())) {
          updateProjectTitleLists();
          ModalHandler.toggleModalDisplay(projectModal);
          ModalHandler.cleanModal(
            Array.from(document.querySelectorAll(".p-data"))
          );
        }
      }
      if (btn.id === "create-todo") {
        if (Library.createNewTodo(ModalHandler.getTodoInfo())) {
          ModalHandler.toggleModalDisplay(todoModal);
          deployProject(document.querySelector("#project-titles").value);
          ModalHandler.cleanModal(
            Array.from(document.querySelectorAll(".t-data"))
          );
        }
      }
    });
  });
}
window.addEventListener("load", () => {
  document.querySelector("body").append(projectModal, todoModal);
  handleModalDisplay();
  handleItemCreation();
  updateProjectTitleLists();
});
