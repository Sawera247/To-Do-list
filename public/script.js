// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBA5xPCpYz0iCpyslCA_iDE66Ymb1Kwbh4",
  authDomain: "to-do-list-22fe3.firebaseapp.com",
  projectId: "to-do-list-22fe3",
  storageBucket: "to-do-list-22fe3.appspot.com",
  messagingSenderId: "581093576737",
  appId: "1:581093576737:web:14e5852067ec5117ed5360",
  measurementId: "G-88ZZ4N0H02",
  databaseURL: "https://to-do-list-22fe3-default-rtdb.firebaseio.com"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let input = document.getElementById('inputs');
let addBtn = document.getElementById('addBtn');
let uList = document.getElementById('uList');
let clear = document.getElementById('clear');

let editTodo = null;
let isEditing = false;

// Load todos from Firebase on start
db.ref('todos').on('value', snapshot => {
    uList.innerHTML = '';
    snapshot.forEach(child => {
        const key = child.key;
        const data = child.val();

        let li = document.createElement('li');
        li.setAttribute('data-key', key);

        let para = document.createElement('p');
        para.textContent = data.text;
        li.appendChild(para);

        let editbtn = document.createElement('button');
        editbtn.setAttribute('class', 'editBtn');
        editbtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
        li.appendChild(editbtn);

        let delbtn = document.createElement('button');
        delbtn.setAttribute('class', 'delBtn');
        delbtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        li.appendChild(delbtn);

        uList.appendChild(li);
    });
});

// Add or update todo
function addbtn() {
    if (input.value.trim().length === 0) {
        alert("You must write something in your list");
        return;
    }

    if (isEditing && editTodo) {
        let key = editTodo.getAttribute('data-key');
        db.ref('todos/' + key).update({
            text: input.value
        });
        addBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
        input.value = '';
        isEditing = false;
        editTodo = null;
    } else {
        let newRef = db.ref('todos').push();
        newRef.set({
            text: input.value
        });
        input.value = '';
    }
}

// Handle delete & edit button clicks
uList.addEventListener('click', function (e) {
    if (e.target.classList.contains("fa-xmark")) {
        const li = e.target.closest('li');
        const key = li.getAttribute('data-key');
        db.ref('todos/' + key).remove();
    }

    if (e.target.classList.contains("fa-pen")) {
        editTodo = e.target.closest('li');
        input.value = editTodo.querySelector('p').textContent;
        input.focus();
        addBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
        isEditing = true;
    }
});

// Clear all todos
function clearAll() {
    db.ref('todos').remove();
}
