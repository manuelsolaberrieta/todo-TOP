/*this function takes a model that follows this pattern: 
model = [
  {
    tag:"tag-name",
    attributes:{type:"value",etc},
    textContent = "text-content-here",
    children:[
      {
        tag:"child-tag-name",
        attributes...etc
      }
    ]
  }
]
and a container that is an html element.
And returns an html element with optional textContent and optional attributes and optional children and so on for grandchildren. 
I will maybe use this in future projects*/
function createHTML(model, container) {
  model.forEach((obj) => {
    const tag = document.createElement(obj.tag);
    if (Object.hasOwn(obj, "attributes")) {
      for (const [key, value] of Object.entries(obj.attributes)) {
        tag.setAttribute(key, value);
      }
    }
    tag.textContent = obj.textContent || "";
    if (Object.hasOwn(obj, "children")) {
      container.appendChild(createHTML(obj.children, tag));
    } else {
      container.appendChild(tag);
    }
  });
  return container;
}
