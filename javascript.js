document.addEventListener('DOMContentLoaded', () => {
    const tasksArea = document.getElementById("task_area");
    const submitButton = document.getElementById("submit_task");

    submitButton.addEventListener('click', (e) => {
        e.preventDefault();

        const taskAssignInput = document.getElementById("assign_task");
        const taskAssignValue = taskAssignInput.value.trim();

        if (taskAssignValue !== "") {
            createTaskElement(taskAssignValue);
            taskAssignInput.value = "";
            saveData();
        }
    });

    function createTaskElement(taskText) {
        const textContainer = document.createElement('div');
        textContainer.style.display = 'flex';

        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.style.padding = "4px";
        checkbox.id = "my-checkbox";

        const taskDiv = document.createElement('div');
        taskDiv.innerHTML = taskText;
        taskDiv.className = 'appended-div';

        const crossMark = document.createElement('img');
        crossMark.src = './cross.png';
        crossMark.style.width = "30px";
        crossMark.style.height = "30px";
        crossMark.style.cursor = "pointer";
        crossMark.style.borderRadius = "50%";
        crossMark.style.border = "1px solid #ccc";
        crossMark.id = "cross_mark";

        textContainer.appendChild(checkbox);
        textContainer.appendChild(taskDiv);
        textContainer.appendChild(crossMark);
        tasksArea.appendChild(textContainer);

        textContainer.addEventListener('click', (e) => {
            handleTaskClick(e, taskDiv, checkbox, crossMark);
        });
    }

    function handleTaskClick(event, taskDiv, checkbox, crossMark) {
        event.preventDefault();

        if (event.target === checkbox) {
            // Checkbox clicked
            taskDiv.style.color = "green";
            taskDiv.style.textDecoration = "line-through";
        } else if (event.target === crossMark) {
            // Cross mark clicked
            const parentElement = event.target.parentElement;
            if (parentElement) {
                parentElement.remove();
                alert("Task removed");
                saveData();
            }
        }
    }

    function saveData() {
        localStorage.setItem('Data', tasksArea.innerHTML);
    }

    function loadData() {
        let data = localStorage.getItem('Data');
        tasksArea.innerHTML = data || '';
    }

    // Load data on page load
    loadData();
});
