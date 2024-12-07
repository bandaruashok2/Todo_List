let taskFormE1=document.getElementById('task-form');
let taskE1=document.getElementById('task-el');

let taskList=localStorage.getItem('tasks')?JSON.parse(localStorage.getItem('tasks')):[];

taskFormE1.addEventListener('submit',function(e){
    e.preventDefault();
    let task=taskE1.value;
    if(task){
        taskList.unshift(task);
        localStorage.setItem('tasks',JSON.stringify(taskList));
        taskE1.value="";
        displayTasks();
    }
    else {
        alert("Task cannot be empty!");
    }
    
    

});

//Display Tasks in UI
function displayTasks(){
    let eachTask='';
    taskList.forEach(function(task,i){
        eachTask+=`<li class="list-group-item
                        list-group-item-secondary mb-2">
                        <span>${task}</span>
                        <i class="bi bi-trash float-end mr-3" onclick="deleteTask(${i})"></i>
                        <i class="bi bi-pen float-end me-4" onclick="updateTask(${i})"></i>
                    </li>`
    });
    document.getElementById('task-list-el').innerHTML=eachTask;
}
displayTasks();

//Delete functionality
function deleteTask(index){
        taskList.splice(index,1);
        localStorage.setItem('tasks',JSON.stringify(taskList));
        displayTasks();
}

//Update functinality
let editingIndex = -1;
function updateTask(index){
    taskE1.value=taskList[index];
    editingIndex=index;


    //taskList.splice(index,1);
    //localStorage.setItem('tasks',JSON.stringify(taskList));
    //displayTasks();
    taskFormE1.addEventListener('submit', function (e) {
        e.preventDefault();
    
        let task = taskE1.value.trim(); 
        if (task) {
            if (editingIndex > -1) { 
                taskList[editingIndex] = task; 
                editingIndex = -1;             
            } else {
                taskList.unshift(task); 
            }
    
            localStorage.setItem('tasks', JSON.stringify(taskList)); 
            taskE1.value = ""; 
            displayTasks();    
        } 
    });
}
