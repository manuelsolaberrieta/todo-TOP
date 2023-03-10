import Project from "./Project.js";
import Todo from "./Todo.js";
const defaultProject = new Project("default-project", "11/01/1993");
const projects = [defaultProject];
export default class Library {
  static createNewTodo(todoData) {
    if (todoData) {
      const todo = new Todo(
        todoData.title,
        todoData.description,
        todoData.date,
        todoData.priority,
        todoData.parentProject
      );
      projects.forEach((p) => {
        if (p.title === todo.parentProject) {
          p.todos.push(todo);
        }
      });
      return true;
    }
  }
  static createNewProject(projectData) {
    if (projectData) {
      const proj = new Project(projectData.title);
      projects.push(proj);
      return true;
    }
  }
  static getProjectTitles() {
    return projects.map((p) => {
      return p.title;
    });
  }
  static getProjects() {
    return projects;
  }
}
