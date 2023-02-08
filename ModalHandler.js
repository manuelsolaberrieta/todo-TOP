export default class ModalHandler {
  static validate(nodelistArray) {
    let valid = true;
    nodelistArray.forEach((input) => {
      if (input.value === "") {
        input.setAttribute("style", "border: 2px solid red;");
        valid = false;
      } else {
        input.setAttribute("style", "border: 1px solid black;");
      }
    });
    return valid;
  }
  static getProjectInfo() {
    const pInfo = {
      title: "",
      date: "",
    };
    const pData = Array.from(document.querySelectorAll(".p-data"));
    if (this.validate(pData)) {
      pInfo.title = pData[0].value;
      pInfo.date = pData[1].value;
      return pInfo;
    } else {
      return false;
    }
  }
  static getTodoInfo() {
    const tInfo = {
      title: "",
      description: "",
      date: "",
      priority: "",
      parentProject: "",
    };
    const tData = Array.from(document.querySelectorAll(".t-data"));
    if (this.validate(tData)) {
      tInfo.title = tData[0].value;
      tInfo.description = tData[1].value;
      tInfo.date = tData[2].value;
      tInfo.priority = tData[3].value;
      tInfo.parentProject = tData[4].value;
      return tInfo;
    } else {
      return false;
    }
  }
  static toggleModalDisplay(modal) {
    modal.style.display === "none"
      ? (modal.style.display = "block")
      : (modal.style.display = "none");
  }
  static cleanModal(data) {
    for (const child of data.values()) {
      child.value = "";
    }
  }
}
