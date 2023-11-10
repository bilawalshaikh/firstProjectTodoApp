// initialize empty array
const arr = [];

const inputElement = document.getElementById("myInput");
const addBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

//check

const checkbtn = document.getElementById("checkbtn");

checkbtn.addEventListener("click", function (e) {
  e.preventDefault();
  console.log(arr);
});

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  handleFormAction();
});

inputElement.addEventListener("keypress", (e) => {
  // Check if the pressed key is Enter
  if (e.key === "Enter") {
    e.preventDefault();
    handleFormAction();
  }
});

function handleFormAction() {
  //check if user click with mouse or pad
  if (inputElement.value !== "") {
    add();
    render();
  } else {
    alert("enter value");
  }
}

function add() {
  arr.push({
    text: inputElement.value,
    isChecked: false,
    id: Date.now(),
  });

  render();
}

function render() {
  // Clear the existing content of ul
  taskList.innerHTML = "";

  arr.forEach((e) => {
    const li = document.createElement("li");
    li.textContent = e.text;

    // Icon
    const crossIcon = document.createElement("i");
    crossIcon.innerHTML = "✖";
    crossIcon.className = "crossIcon";

    crossIcon.addEventListener("click", handleDelete);
    crossIcon.setAttribute("x-id", e.id);

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";
    checkbox.addEventListener("change", handleCheckboxChange);
    checkbox.setAttribute("c-id", e.id);

    if (e.isChecked) {
      checkbox.checked = true;
    }

    li.appendChild(checkbox);
    li.appendChild(crossIcon);

    // Append the new list item to the taskList
    taskList.appendChild(li);
  });

  inputElement.value = "";
}

function handleDelete(event) {
  const clickedId = event.target.getAttribute("x-id");
  arr.forEach((item, index, arr) => {
    if (item.id == clickedId) {
      arr.splice(index, 1);
      // event.target.parentNode.remove();
    }
  });
  render();
}

function handleCheckboxChange(event) {
  const checkbox = event.target;
  const clickedId = event.target.getAttribute("c-id");

  arr.forEach((item, index, arr) => {
    if (item.id == clickedId && checkbox.checked) {
      event.target.parentNode.style.textDecoration = "line-through";
      arr[index].isChecked = true;
    } else if (!checkbox.checked) {
      arr[index].isChecked = false;
      event.target.parentNode.style.textDecoration = "none";
    }
  });
}
