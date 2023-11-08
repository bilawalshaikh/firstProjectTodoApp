const inputElement = document.getElementById("myInput");
const addBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", function () {
  if (inputElement.value !== "") {
    //created 3 elemets
    const li = document.createElement("li");
    const buttonRemove = document.createElement("button");
    const buttonCompleted = document.createElement("button");

    //added remove btn text and class
    buttonRemove.textContent = "Remove";
    buttonRemove.className = "Cross";

    //added completed btn text and class
    buttonCompleted.textContent = "Completed";
    buttonCompleted.className = "Completed";

    //set the inner text of li
    li.innerText = inputElement.value;

    //adding both the buttons to li
    li.appendChild(buttonCompleted);
    li.appendChild(buttonRemove);

    //added li in ul
    taskList.appendChild(li);

    //setting input value = null
    inputElement.value = "";

    //event handler for completed button
    buttonCompleted.addEventListener("click", function (e) {
      // e.target.style.textDecoration = "line-through";
      li.style.textDecoration = "line-through";
    });

    //event handler for remove button
    buttonRemove.addEventListener("click", function (e) {
      li.remove();
    });
  } else {
    alert("please enter text");
  }
});
