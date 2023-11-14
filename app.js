// initialize empty array
const arr = [];

const inputElement = document.querySelector("input");
const addBtn = document.querySelector("#addTask");
const taskList = document.querySelector("#taskList");

const renderFromLocalStorage = () => {
  const storedData = localStorage.getItem("todo");

  if (storedData) {
    const todoItems = JSON.parse(storedData);

    todoItems.forEach((e) => {
      const li = document.createElement("li");
      li.textContent = e.text;

      const crossIcon = document.createElement("i");
      crossIcon.innerHTML = "✖";
      crossIcon.className = "crossIcon";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "checkbox";
      checkbox.checked = e.isChecked;

      checkbox.addEventListener("change", () => {
        e.isChecked = checkbox.checked;
        localStorage.setItem("todo", JSON.stringify(todoItems));
        li.style.textDecoration = checkbox.checked ? "line-through" : "none";
      });

      if (e.isChecked) {
        checkbox.checked = true;
        li.style.textDecoration = "line-through";
      }

      crossIcon.addEventListener("click", () => {
        const indexToDelete = todoItems.findIndex((item) => item.id == e.id);

        if (indexToDelete !== -1) {
          todoItems.splice(indexToDelete, 1);
          localStorage.setItem("todo", JSON.stringify(todoItems));
          li.remove();
        }
      });

      li.appendChild(checkbox);
      li.appendChild(crossIcon);

      taskList.appendChild(li);
    });
  } else {
    console.log("No todo items found in localStorage.");
  }
};

renderFromLocalStorage();

//only for testing purpose
const checkbtn = document.getElementById("checkbtn");
checkbtn.addEventListener("click", function (e) {
  e.preventDefault();
  console.log(arr);
});

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  handleFormAction();
});

const handleFormAction = () => {
  //check if user click with mouse or pad
  if (inputElement.value !== "") {
    add();
  } else {
    alert("Enter Some text in input field ");
  }
};

const add = () => {
  const newElement = {
    text: inputElement.value,
    isChecked: false,
    id: Date.now(),
  };

  arr.push(newElement);

  localStorage.setItem("todo", JSON.stringify(arr));
  render(newElement);
};

const render = (newElement) => {
  const li = document.createElement("li");
  li.textContent = newElement.text;

  // Icon
  const crossIcon = document.createElement("i");
  crossIcon.innerHTML = "✖";
  crossIcon.className = "crossIcon";
  crossIcon.setAttribute("x-id", newElement.id);

  // Checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "checkbox";
  checkbox.setAttribute("c-id", newElement.id);

  if (newElement.isChecked) {
    checkbox.checked = true;
    li.style.textDecoration = "line-through";
  }

  li.appendChild(checkbox);
  li.appendChild(crossIcon);

  taskList.appendChild(li);
  inputElement.value = "";
};

taskList.addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("checkbox")) {
    handleCheckboxChange(e);
  } else if (target.classList.contains("crossIcon")) {
    handleDelete(e);
  }
});

const handleDelete = (event) => {
  const clickedId = event.target.getAttribute("x-id");
  const indexToDelete = arr.findIndex((item) => item.id == clickedId);

  if (indexToDelete !== -1) {
    arr.splice(indexToDelete, 1);
    event.target.parentNode.remove();
    localStorage.setItem("todo", JSON.stringify(arr));
  }
};

const handleCheckboxChange = (event) => {
  const checkbox = event.target;
  const clickedId = event.target.getAttribute("c-id");

  const foundItem = arr.find((item) => item.id == clickedId);

  if (foundItem) {
    const index = arr.indexOf(foundItem);
    if (checkbox.checked) {
      event.target.parentNode.style.textDecoration = "line-through";
      arr[index].isChecked = true;
    } else {
      arr[index].isChecked = false;
      event.target.parentNode.style.textDecoration = "none";
    }
    localStorage.setItem("todo", JSON.stringify(arr));
  }
};
