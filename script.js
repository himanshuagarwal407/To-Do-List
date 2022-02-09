var addButton = document.getElementById("add-button");
addButton.addEventListener("click", addToDoItem);

var toDoEntryBox = document.getElementById("todo-entry-box");

// toDoEntryBox.addEventListener("keyup", function(event) {
//     // alert(event.keyCode);
//     if (event.keyCode === 13) {
//         event.preventDefault();
//         addToDoItem();
//         alert("sdn");
//     }
// });

var toDoList = document.getElementById("todo-list");

function addToDoItem(){
    var itemText = toDoEntryBox.value;
    newToDoItem(itemText,false);

    document.getElementById('todo-entry-box').value='' ;
    
}

function newToDoItem(itemText,completed){
    var toDoItem = document.createElement("li");
    var toDoText = document.createTextNode(itemText);

    toDoItem.appendChild(toDoText);

    if(completed){
        toDoItem.classList.add("completed");
    }

    toDoList.appendChild(toDoItem);
    toDoItem.addEventListener("dblclick",toggleToDoItemState);

}

function toggleToDoItemState(){
    if(this.classList.contains("completed")){
        this.classList.remove("completed");
    }else{
        this.classList.add("completed");
    }
}

var clearCompletedButton = document.getElementById("clear-completed-button");
clearCompletedButton.addEventListener("click",clearCompleted);

function clearCompleted(){
    var completedItems = toDoList.getElementsByClassName("completed");

    while(completedItems.length>0){
        completedItems.item(0).remove();
    }

}

var emptyButton = document.getElementById("empty-button");
emptyButton.addEventListener("click", emptyList);

function emptyList(){
    var toDoItems = toDoList.children;

    while(toDoItems.length>0){
        toDoItems.item(0).remove();
    }

}

var saveButton = document.getElementById("save-button");
saveButton.addEventListener("click",saveList);

function saveList(){
    var toDos=[];

    for (var i=0; i<toDoList.children.length; i++){
        var toDo = toDoList.children.item(i);

        var toDoInfo = {
            "task": toDo.innerText,
            "completed": toDo.classList.contains("completed")
        };

        toDos.push(toDoInfo);
    }

    localStorage.setItem("toDos",JSON.stringify(toDos));

}

function loadList(){
    if(localStorage.getItem("toDos") != null){
        var toDos = JSON.parse(localStorage.getItem("toDos"));

        for (var i=0; i<toDos.length; i++){
            var toDo = toDos[i];
            newToDoItem(toDo.task, toDo.completed);
        }
    }

}

loadList();