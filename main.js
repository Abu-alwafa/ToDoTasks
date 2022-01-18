const Input = document.querySelector('form input[type=text]');
const Submit = document.querySelector('form input[type=submit]');
const Tasks_Area = document.querySelector('.tasks');
const clearBtn = document.querySelector('form button[type=button]');
let tasksArr = [];

if(localStorage.length !== 0 && localStorage.tasks !== 'undefined'){
  tasksArr = JSON.parse(localStorage.getItem('tasks'));
  addTasks(tasksArr);

  tasksArr.forEach((task, index)=>{
    if(task.completed){
      Tasks_Area.children[index].style.background = '#3f8755';
      Tasks_Area.children[index].children[0].style.textDecoration = 'line-through';
      Tasks_Area.children[index].children[0].style.color = 'white';
    }
  })
}

Submit.addEventListener('click', function(e){
  
  e.preventDefault();

  if(Input.value !== ''){
    
    drowTasks(Input.value);
    Input.value = '';
    Input.focus();
  }
})

function drowTasks(text){
  const task = {
    id: Date.now(),
    taskText: text,
    completed: false
  };

  tasksArr.push(task);

  addTasks(tasksArr);
  
  saveToStorage(tasksArr);
};

function addTasks(tasksArr){
  Tasks_Area.innerHTML = '';

  tasksArr.forEach(task=>{
    Tasks_Area.innerHTML += `
            <div data-id="${task.id}" style="width: 100%;" class="row task-item">
                <div class="col-12 col-md-10"><p>${task.taskText}</p></div>
                <div class="col-12 col-md-2 offset-10 offset-md-0"><button class="bg-success" onclick="doneTask(this)"><i class="fas fa-check-square"></i></button>
                    <button class="bg-danger" onclick="deleteTask(this)"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>
            `;
  })

}
function saveToStorage(arr){
  localStorage.setItem('tasks', JSON.stringify(arr));
}


// delete button function
function deleteTask(param) {
    param.parentElement.parentElement.remove();
    removeStoragedItem(param.parentElement.parentElement.getAttribute('data-id'));

}

function removeStoragedItem(taskId){
  tasksArr = tasksArr.filter(task => task.id != taskId);
  saveToStorage(tasksArr);
}


document.querySelector('button.bg-danger')?.addEventListener('click', function(e){
  tasksArr.forEach(task=>{
    if(task.id == e.currentTarget.parentElement.parentElement.getAttribute('data-id')){
      task.completed = true;
    }
  })
  saveToStorage(tasksArr);
  console.log(tasksArr);
})

function doneTask(param){
  
  tasksArr.forEach((task,index)=>{
    if(task.id == param.parentElement.parentElement.getAttribute('data-id')){
      if(!task.completed){
        task.completed = true;
        Tasks_Area.children[index].style.background = '#3f8755';
        Tasks_Area.children[index].children[0].style.textDecoration = 'line-through';
        Tasks_Area.children[index].children[0].style.color = 'white';
      }else{
        task.completed = false;
        Tasks_Area.children[index].style.background = 'white';
        Tasks_Area.children[index].children[0].style.textDecoration = 'none';
        Tasks_Area.children[index].children[0].style.color = 'black';
      }
    }
  })
  saveToStorage(tasksArr);
}

clearBtn.onclick = function () {
  tasksArr.length = 0;
  localStorage.clear();
  Tasks_Area.remove();
  location.reload();
}
