document.addEventListener('DOMContentLoaded', () => {
    const columns = document.querySelectorAll('.column');

    columns.forEach(column => {
        column.addEventListener('dragover', dragOver);
        column.addEventListener('dragenter', dragEnter);
        column.addEventListener('dragleave', dragLeave);
        column.addEventListener('drop', drop);
    });

    loadTasks();
});

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
    setTimeout(() => {
        event.target.classList.add('hide');
    }, 0);
}

function dragEnd(event) {
    event.target.classList.remove('hide');
}

function dragOver(event) {
    event.preventDefault();
}

function dragEnter(event) {
    event.preventDefault();
    event.target.classList.add('drag-over');
}

function dragLeave(event) {
    event.target.classList.remove('drag-over');
}

function drop(event) {
    const id = event.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);
    event.target.classList.remove('drag-over');
    if (event.target.classList.contains('column')) {
        event.target.appendChild(draggable);
        saveTasks();
    }
}

function openTaskModal(action, column, taskId = null) {
    const modal = document.getElementById('taskModal');
    const modalTitle = document.getElementById('modalTitle');
    const taskNameInput = document.getElementById('taskName');
    const taskIdInput = document.getElementById('taskId');
    const taskColumnInput = document.getElementById('taskColumn');

    if (action === 'add') {
        modalTitle.textContent = 'Add Task';
        taskNameInput.value = '';
        taskIdInput.value = '';
    } else if (action === 'edit') {
        modalTitle.textContent = 'Edit Task';
        const taskElement = document.getElementById(taskId);
        taskNameInput.value = taskElement.textContent.trim();
        taskIdInput.value = taskId;
    }

    taskColumnInput.value = column;
    modal.style.display = 'block';
}

function closeTaskModal() {
    const modal = document.getElementById('taskModal');
    modal.style.display = 'none';
}

function saveTask() {
    const taskNameInput = document.getElementById('taskName');
    const taskIdInput = document.getElementById('taskId');
    const taskColumnInput = document.getElementById('taskColumn');

    if (taskNameInput.value.trim() === '') {
        alert('Task name cannot be empty');
        return;
    }

    if (taskIdInput.value === '') {
        const taskId = `task${new Date().getTime()}`;
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.id = taskId;
        taskElement.draggable = true;
        taskElement.addEventListener('dragstart', dragStart);
        taskElement.addEventListener('dragend', dragEnd);
        taskElement.innerHTML = `${taskNameInput.value} <span onclick="openTaskModal('edit', '${taskColumnInput.value}', '${taskId}')">&#9998;</span>`;

        const column = document.getElementById(taskColumnInput.value);
        column.appendChild(taskElement);
    } else {
        const taskElement = document.getElementById(taskIdInput.value);
        taskElement.innerHTML = `${taskNameInput.value} <span onclick="openTaskModal('edit', '${taskColumnInput.value}', '${taskIdInput.value}')">&#9998;</span>`;
    }

    closeTaskModal();
    saveTasks();
}

function saveTasks() {
    const columns = document.querySelectorAll('.column');
    const tasksData = {};

    columns.forEach(column => {
        const tasks = column.querySelectorAll('.task');
        tasksData[column.id] = [];
        tasks.forEach(task => {
            tasksData[column.id].push({
                id: task.id,
                name: task.textContent.trim().replace('✎', '')
            });
        });
    });

    localStorage.setItem('tasksData', JSON.stringify(tasksData));
}

function loadTasks() {
    const tasksData = JSON.parse(localStorage.getItem('tasksData')) || {};

    for (const [columnId, tasks] of Object.entries(tasksData)) {
        const column = document.getElementById(columnId);
        tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task');
            taskElement.id = task.id;
            taskElement.draggable = true;
            taskElement.addEventListener('dragstart', dragStart);
            taskElement.addEventListener('dragend', dragEnd);
            taskElement.innerHTML = `${task.name} <span onclick="openTaskModal('edit', '${columnId}', '${task.id}')">&#9998;</span>`;
            column.appendChild(taskElement);
        });
    }
}
