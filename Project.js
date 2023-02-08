export default class Project {
  constructor(title, dueDate) {
    this.title = title;
    this.dueDate = dueDate;
    this.todos = [];
    this.completed = false;
  }
}
