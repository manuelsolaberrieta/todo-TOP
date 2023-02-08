const projectModal = [
  {
    tag: "div",
    attributes: { class: "modal" },
    children: [
      {
        tag: "h3",
        textContent: "New Project",
      },
      {
        tag: "INPUT",
        attributes: {
          type: "text",
          id: "p-title",
          class: "p-data",
          name: "p-title",
          placeholder: "Project Title",
          maxlength: "20",
        },
      },
      {
        tag: "span",
        attributes: { class: "open-close-modal", id: "close-project-modal" },
        textContent: "X",
      },
      {
        tag: "button",
        attributes: { class: "create-modal", id: "create-project" },
        textContent: "Create",
      },
    ],
  },
];
const todoModal = [
  {
    tag: "div",
    attributes: { class: "modal" },
    children: [
      {
        tag: "h3",
        textContent: "New ToDo",
      },
      {
        tag: "INPUT",
        attributes: {
          type: "text",
          id: "t-title",
          class: "t-data",
          name: "t-title",
          placeholder: "to-do title",
          maxlength: "20",
        },
      },
      {
        tag: "span",
        attributes: { class: "open-close-modal", id: "close-todo-modal" },
        textContent: "X",
      },
      {
        tag: "TEXTAREA",
        attributes: {
          id: "t-description",
          name: "t-description",
          placeholder: "to-do description",
          maxlength: "160",
        },
      },
      {
        tag: "INPUT",
        attributes: {
          type: "date",
          id: "t-end",
          class: "t-data",
          name: "t-end",
        },
      },
      {
        tag: "SELECT",
        attributes: {
          name: "t-priority",
          id: "t-priority",
          class: "t-data",
        },
        children: [
          {
            tag: "option",
            attributes: {
              value: "normal",
            },
            textContent: "Normal",
          },
          {
            tag: "option",
            attributes: {
              value: "high",
            },
            textContent: "High",
          },
        ],
      },
      {
        tag: "SELECT",
        attributes: {
          class: "t-data",
          id: "project-titles",
        },
      },
      {
        tag: "button",
        attributes: { class: "create-modal", id: "create-todo" },
        textContent: "Create",
      },
    ],
  },
];
export default class Modal {
  constructor(type) {
    this.type = type;
  }
  createModal(model, container) {
    model.forEach((obj) => {
      const tag = document.createElement(obj.tag);
      if (Object.hasOwn(obj, "attributes")) {
        for (const [key, value] of Object.entries(obj.attributes)) {
          tag.setAttribute(key, value);
        }
      }
      tag.textContent = obj.textContent || "";
      if (Object.hasOwn(obj, "children")) {
        container.appendChild(this.createModal(obj.children, tag));
      } else {
        container.appendChild(tag);
      }
    });
    return container;
  }
  createContainer(modalClass) {
    const container = document.createElement("div");
    container.classList.add("modal-container", modalClass);
    container.setAttribute("style", "display:none;");
    return container;
  }
  createUi() {
    switch (this.type) {
      case "Project": {
        return this.createModal(projectModal, this.createContainer("Project"));
      }
      case "Todo": {
        return this.createModal(todoModal, this.createContainer("Todo"));
      }
      default:
        console.error("Modal type does not exist. Try 'Project' or 'Todo'");
        break;
    }
  }
}
