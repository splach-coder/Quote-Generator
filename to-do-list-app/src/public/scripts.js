// this file is for handling the client-side js so when u  update tasks the page is not reloading 
document.querySelector('#task-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const title = document.querySelector('#task-title').value;
    const dueDate = document.querySelector('#task-due-date').value;

    await fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, dueDate })
    });

    document.querySelector('#task-title').value = '';
    document.querySelector('#task-due-date').value = '';
    loadTasks();
});

async function loadTasks() {
    const response = await fetch('/tasks');
    const tasks = await response.json();
    const taskList = document.querySelector('#task-list');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = `${task.title} - Due: ${task.dueDate}`;
        li.className = task.completed ? 'completed' : '';
        
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.onclick = async () => {
            await fetch(`/tasks/${task._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ completed: true })
            });
            loadTasks();
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = async () => {
            await fetch(`/tasks/${task._id}`, {
                method: 'DELETE'
            });
            loadTasks();
        };

        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

document.querySelector('#search-bar').addEventListener('input', async (e) => {
    const query = e.target.value;
    const response = await fetch(`/tasks/search?query=${query}`);
    const tasks = await response.json();
    const taskList = document.querySelector('#task-list');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = `${task.title} - Due: ${task.dueDate}`;
        li.className = task.completed ? 'completed' : '';
        taskList.appendChild(li);
    });
});

loadTasks();