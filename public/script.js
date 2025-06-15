let input = document.getElementById('inputs');
let addBtn = document.getElementById('addBtn');
let uList = document.getElementById('uList');
let clear = document.getElementById('clear');

let editTodo = null;
let isEditing = false;

function addbtn() {
    // Prevent empty input
    if (input.value.trim().length === 0) {
        alert("You must write something in your list");
        return;
    }

    if (isEditing && editTodo) {
        // Update existing todo
        editTodo.querySelector('p').textContent = input.value;
        addBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
        input.value = '';
        isEditing = false;
        editTodo = null;
    } else {
        // Create new todo
        let li = document.createElement('li');

        let para = document.createElement('p');
        para.textContent = input.value;
        li.appendChild(para);

        // Edit button
        let editbtn = document.createElement('button');
        editbtn.setAttribute('class', 'editBtn');
        editbtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
        li.appendChild(editbtn);

        // Delete button
        let delbtn = document.createElement('button');
        delbtn.setAttribute('class', 'delBtn');
        delbtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        li.appendChild(delbtn);

        uList.appendChild(li);
        input.value = '';
    }
}

// Clear all list items
function clearAll() {
    uList.innerHTML = '';
}

// Handle edit and delete clicks using event delegation
uList.addEventListener('click', function (e) {
    if (e.target.classList.contains("fa-xmark")) {
        const li = e.target.closest('li');
        uList.removeChild(li);
    }

    if (e.target.classList.contains("fa-pen")) {
        editTodo = e.target.closest('li');
        input.value = editTodo.querySelector('p').textContent;
        input.focus();
        addBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
        isEditing = true;
    }
});
