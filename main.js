const form = document.getElementById('addForm');

const itemsList = document.getElementById("items");

const filter = document.getElementById("filter");


let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
}


tasks.forEach(function (item) {

    const newItemText = item;

    const newElement = document.createElement("li");
    
    newElement.className = "list-group-item";

    const newTextNode = document.createTextNode(newItemText);

    newElement.appendChild(newTextNode);

    const deletBtn = document.createElement("button");

    deletBtn.appendChild(document.createTextNode("Удалить"));

    deletBtn.className = "btn btn-light btn-sm float-right"

    deletBtn.dataset.action = "delete";

    newElement.appendChild(deletBtn);

    itemsList.prepend(newElement);

})

form.addEventListener("submit", addItem);

function addItem (event){

    event.preventDefault();

    const newItemInput = document.getElementById("newItemText");

    const newItemText = newItemInput.value;

    const newElement = document.createElement("li");
    
    newElement.className = "list-group-item";

    const newTextNode = document.createTextNode(newItemText);

    newElement.appendChild(newTextNode);

    const deletBtn = document.createElement("button");

    deletBtn.appendChild(document.createTextNode("Удалить"));

    deletBtn.className = "btn btn-light btn-sm float-right"

    deletBtn.dataset.action = "delete";

    newElement.appendChild(deletBtn);

    itemsList.prepend(newElement);

    tasks.push(newItemText);


    const jsonTasks = JSON.stringify(tasks);


    localStorage.setItem('tasks', jsonTasks);



    newItemInput.value = "";

    
}



itemsList.addEventListener("click", removeItem);

function removeItem(event) {
    

    if (event.target.hasAttribute("data-action") && 
    event.target.getAttribute("data-action") == "delete") {
        if (confirm("Удалить задачу?")) {
            event.target.parentNode.remove();
        }

    const taskText = event.target.closest('.list-group-item').firstChild.textContent;
    

        const index = tasks.findIndex(function (item) {

            if (taskText === item) {
                return true
            }
        })

        if (index !== -1) {
            tasks.splice(index, 1);
        }
        
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

};

filter.addEventListener("keyup", filterItems);

function filterItems(event) {
    
    const searchedText = event.target.value.toLowerCase();

    const items = itemsList.querySelectorAll("li");

    items.forEach(function(item) {

        const itemText = item.firstChild.textContent.toLowerCase();

        if (itemText.indexOf(searchedText) != -1) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }

    })

};

