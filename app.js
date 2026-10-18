const newTaskInput = document.querySelector('#newTask');
const addBtn = document.querySelector('#addBtn');
const taskList = document.querySelector('#taskList');
const countSpan = document.querySelector('#count');
const clearCompletedBtn = document.querySelector('#clearCompleted');
const filterButtons = document.querySelectorAll('[data-filter]');

let tasks = [];
let currentFilter = 'all';

function addTask(){
  const text = newTaskInput.value.trim();
  if(!text) return; // refuse empty / spaces-only
  tasks.push({ id: Date.now(), text: text, completed: false });
  newTaskInput.value = ''; // clear afterwards
  render();
}

function render(){
  taskList.textContent = ''; // clear list
  let filtered = tasks.filter(t => {
    if(currentFilter==='active') return !t.completed;
    if(currentFilter==='completed') return t.completed;
    return true;
  });

  filtered.forEach(task => {
    const li = document.createElement('li');
    if(task.completed) li.classList.add('completed');
    li.dataset.id = task.id;

    const span = document.createElement('span');
    span.textContent = task.text; // NEVER innerHTML - passes rule

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.classList.add('delete-btn');

    // double-click to edit bonus
    span.addEventListener('dblclick', () => {
      const input = document.createElement('input');
      input.value = task.text;
      li.replaceChild(input, span);
      input.focus();
      const save = () => {
        const v = input.value.trim();
        if(v) task.text = v;
        render();
      };
      input.addEventListener('keydown', e => {
        if(e.key==='Enter') save();
        if(e.key==='Escape') render();
      });
      input.addEventListener('blur', save);
    });

    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });

  const left = tasks.filter(t=>!t.completed).length;
  countSpan.textContent = `${left} ${left===1?'item left':'items left'}`;
}

// EVENT DELEGATION: ONE click listener on the list, not one per task
taskList.addEventListener('click', (e)=>{
  const li = e.target.closest('li');
  if(!li) return;
  const id = Number(li.dataset.id);
  const task = tasks.find(t=>t.id===id);
  if(!task) return;

  if(e.target.classList.contains('delete-btn')){
    tasks = tasks.filter(t=>t.id!==id);
  } else {
    task.completed = !task.completed; // click to toggle
  }
  render();
});

addBtn.addEventListener('click', addTask);
newTaskInput.addEventListener('keydown', e => { if(e.key==='Enter') addTask(); });
clearCompletedBtn.addEventListener('click', ()=>{
  tasks = tasks.filter(t=>!t.completed);
  render();
});
filterButtons.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    filterButtons.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    render();
  });
});

render();
