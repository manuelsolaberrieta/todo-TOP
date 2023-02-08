export default class Todo {
  constructor(title, description, dueDate, priority, parentProject) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.parentProject = parentProject;
    this.completed = false;
  }
}
