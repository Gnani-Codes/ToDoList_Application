let todoTaskData = [];

let themeCheckBoxEl = document.getElementById("themeCheckbox");
let bgContainer = document.getElementById("BGcontainer");
let todoHeadingEl = document.getElementById("todoHeading");
let addBtnEl = document.getElementById("addBtn");
let inputTitle = document.getElementById("inputTitle");
let inputTask = document.getElementById("inputTask");
let taskItemsContainer = document.getElementById("taskItemsContainer");
let saveBtnEl = document.getElementById("saveBtn");

let storedData = localStorage.getItem("todoTaskData");
storedData = JSON.parse(storedData);
console.log("stored", storedData);
if (storedData !== null) {
    for (let task of storedData) {
        createAndAppendTask(task);
    }
    todoTaskData = storedData;
}
console.log(todoTaskData)
let tasksCount = todoTaskData.length;

themeCheckBoxEl.addEventListener("click", function() {
    if (themeCheckBoxEl.checked) {
        bgContainer.classList.add("bg-container-dark");
        todoHeadingEl.classList.add("todo-head-dark");
    }
    if (!(themeCheckBoxEl.checked)) {
        bgContainer.classList.remove("bg-container-dark");
        todoHeadingEl.classList.remove("todo-head-dark");
    }

});

function deleteIconFromList(taskCount) {
    let taskContainerID = "task" + taskCount;
    let taskToremove = document.getElementById(taskContainerID);
    taskItemsContainer.removeChild(taskToremove);
    todoTaskData.splice(taskCount, 1);
}

function checkBoxStatusChange(headingId, paraId) {
    let headingElement = document.getElementById(headingId);
    let paraEl = document.getElementById(paraId);

    headingElement.classList.toggle("checked-style");
    paraEl.classList.toggle("checked-style");
}

function createAndAppendTask(taskData) {
    let taskId = "task" + taskData.taskCount;
    let checkboxId = "checkbox" + taskData.taskCount;
    let headingElID = "head" + taskData.taskCount;
    let paraId = "para" + taskData.taskCount;

    let taskContanierElement = document.createElement("li");
    taskContanierElement.classList.add("todoitem-container", "col-12", "col-lg-4");
    taskContanierElement.setAttribute("id", taskId);
    taskItemsContainer.appendChild(taskContanierElement);

    let inputDeleteIconContainer = document.createElement("div");
    inputDeleteIconContainer.classList.add("input-delete-icons-container");
    taskContanierElement.appendChild(inputDeleteIconContainer);

    let checkBoxElement = document.createElement("input");
    checkBoxElement.setAttribute("type", "checkbox");
    checkBoxElement.classList.add("checkbox-input");

    checkBoxElement.setAttribute("id", checkboxId);
    inputDeleteIconContainer.appendChild(checkBoxElement);

    let deleteIconEl = document.createElement("i");
    deleteIconEl.classList.add("far", "fa-trash-alt", "delete-icon");
    inputDeleteIconContainer.appendChild(deleteIconEl);

    deleteIconEl.onclick = function() {
        deleteIconFromList(taskData.taskCount);
    };

    let taskDescriptionContainer = document.createElement("div");
    taskDescriptionContainer.classList.add("todoItem-task-container");
    taskContanierElement.appendChild(taskDescriptionContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.classList.add("col-12");
    taskDescriptionContainer.appendChild(labelElement);

    let labelHeadingEl = document.createElement("h1");
    labelHeadingEl.classList.add("task-label-head");
    labelHeadingEl.setAttribute("id", headingElID);
    labelHeadingEl.textContent = taskData.title;
    labelElement.appendChild(labelHeadingEl);

    let hrEL = document.createElement("hr");
    labelElement.appendChild(hrEL);

    let labelParaEl = document.createElement("p");
    labelParaEl.setAttribute("id", paraId);
    labelParaEl.classList.add("task-label-para");
    labelParaEl.textContent = taskData.description;
    labelElement.appendChild(labelParaEl);

    if (taskData.isChecked) {
        checkBoxElement.checked = "checked";
        checkBoxStatusChange(headingElID, paraId);
    }
    checkBoxElement.onclick = function() {
        let checkBoxCondition = todoTaskData[taskData.taskCount].isChecked;
        if (!checkBoxCondition) {
            todoTaskData[taskData.taskCount].isChecked = true;
        } else {
            todoTaskData[taskData.taskCount].isChecked = false;
        }
        console.log(checkBoxCondition)

        checkBoxStatusChange(headingElID, paraId);
    };

    inputTitle.value = "";
    inputTask.value = "";
}

addBtnEl.onclick = function() {
    if (inputTitle.value === "") {
        alert("Enter Valid Title");
    }
    if (inputTask.value === "") {
        alert("Enter Task");
    } else {

        let newtask = {
            title: inputTitle.value,
            description: inputTask.value,
            taskCount: tasksCount,
            isChecked: false
        };
        todoTaskData.push(newtask);
        createAndAppendTask(newtask);
        tasksCount += 1;
    }
};


saveBtnEl.onclick = function() {
    localStorage.setItem("todoTaskData", JSON.stringify(todoTaskData));
};