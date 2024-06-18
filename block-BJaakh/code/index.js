// Sample code here
document.addEventListener('DOMContentLoaded', function() {
    const todoList = document.getElementById('todoList');
    const newTodoInput = document.getElementById('newTodoInput');
    const addTodoBtn = document.getElementById('addTodoBtn');

    let todos = [];

    // Display todos on page load
    function displayTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const todoItem = createTodoElement(todo, index);
            todoList.appendChild(todoItem);
        });
    }

    // Create a new todo element
    function createTodoElement(todo, index) {
        const todoItem = document.createElement('li');
        todoItem.className = 'todo-item';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => toggleTodoCompletion(index));

        const todoText = document.createElement('input');
        todoText.type = 'text';
        todoText.value = todo.text;
        todoText.addEventListener('dblclick', () => editTodo(index));
        todoText.addEventListener('blur', () => saveEditedTodoText(index));
        todoText.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveEditedTodoText(index);
            }
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '❌';
        deleteBtn.addEventListener('click', () => deleteTodo(index));

        todoItem.appendChild(checkbox);
        todoItem.appendChild(todoText);
        todoItem.appendChild(deleteBtn);

        return todoItem;
    }

    // Add new todo
    addTodoBtn.addEventListener('click', () => {
        const newTodoText = newTodoInput.value.trim();
        if (newTodoText) {
            const newTodo = {
                text: newTodoText,
                completed: false
            };
            todos.push(newTodo);
            newTodoInput.value = '';
            displayTodos();
        }
    });

    // Toggle todo completion
    function toggleTodoCompletion(index) {
        todos[index].completed = !todos[index].completed;
        displayTodos();
    }

    // Edit todo text
    function editTodo(index) {
        const todoText = todoList.childNodes[index].querySelector('input[type="text"]');
        todoText.disabled = false;
        todoText.focus();
    }

    // Save edited todo text
    function saveEditedTodoText(index) {
        const todoText = todoList.childNodes[index].querySelector('input[type="text"]');
        todos[index].text = todoText.value.trim();
        todoText.disabled = true;
        displayTodos();
    }

    // Delete todo
    function deleteTodo(index) {
        todos.splice(index, 1);
        displayTodos();
    }

    // Initial display of todos
    displayTodos();
});
