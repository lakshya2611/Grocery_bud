const alert = document.querySelector(".alert");
const form = document.querySelector(".form");
const gettext = document.querySelector(".gettext");
const btn = document.querySelector(".btn");
const cont = document.querySelector(".cont");
const list = document.querySelector(".btn-container");
const clrbtn = document.querySelector(".clear");
const grlist = document.querySelector(".grlist");
const contlist = document.querySelector(".list");


let editElement;
let editFlag = false;
let editID = "";

//submit
form.addEventListener("submit", addItem)
clrbtn.addEventListener("click",clrItem)


function addItem(e) {
    e.preventDefault();
    let input = gettext.value;
    // console.log(input);
    const id = new Date().getTime().toString();
    // console.log(id)

    if (input && !editFlag) {
        const element = document.createElement("article");
        element.classList.add("grlist");

        const att = document.createAttribute("data-id")
        att.value = id;
        element.setAttributeNode(att);

        element.innerHTML = `<div class="btn-container">
        <p class="title">${input}</p>
        <button class="edit">
            <i class="fas fa-edit fa-2x"></i>
        </button>
        <button class="delete">
            <i class="fas fa-trash-alt fa-2x"></i>
        </button>
    </div>`

    const delbtn = element.querySelector(".delete");
    const editbtn = element.querySelector(".edit");

    delbtn.addEventListener("click",delItem);
    editbtn.addEventListener("click",editItem);

        cont.appendChild(element);
        displayAlert("Item added to List", "alert-success");
        contlist.classList.add("showlist");

        addToLocalStorage(id, input);
        setBackToDefault();


    }

    else if (input && editFlag) {
        // console.log(input);
        editElement.innerHTML = input;
        displayAlert("value edited","alert-success");
        editLocalStorage(editID,input);
        setBackToDefault();

    }
    else {
        displayAlert("Please enter a value", "alert-danger");

    }
}


function delItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    // console.log(element);
    cont.removeChild(element);
    if(cont.children.length === 0){
    contlist.classList.remove("showlist");
    }
    displayAlert("Item Deleted","alert-danger");
    removeFromLocalStorage(id);
    setBackToDefault();
}


function editItem(e){

    const element = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.children[0];
    gettext.value = editElement.innerHTML;
    editID = element.dataset.id;
    // console.log(editID);
    btn.innerHTML = "Edit";
    editFlag = true;
}


//display alert
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(action);

    setTimeout(() => {
        alert.textContent = "";
        alert.classList.remove(action);
    }, 1000);
}

function setBackToDefault() {
    gettext.value = "";
    editFlag = false;
    editID = "";
    btn.textContent = "submit";
}


// add to local storage
function addToLocalStorage(id, value) {
    let item = {id,value};
    let items = getLocalStorage();
    items.push(item)
    localStorage.setItem("list", JSON.stringify(items));
}

function editLocalStorage(editID,input){
    let items = getLocalStorage();
    items = items.map(function(item){
        if(item.id === editID){
            item.value = input;
        }
        return items
    });
    localStorage.setItem("list", JSON.stringify(items));
}


function removeFromLocalStorage(id){
    let items = getLocalStorage();
    items = items.filter(function(item){
        if(item.id !== id){
            return item
        }
    });
    localStorage.setItem("list", JSON.stringify(items));
}


function clrItem(){
    const h = document.querySelectorAll(".grlist");
    if(h.length>0){
        h.forEach(function(item){
            cont.removeChild(item);
        })
    }
    contlist.classList.remove("showlist");
    displayAlert("List is cleared","alert-success");
    setBackToDefault();
    localStorage.removeItem("list");
}


function getLocalStorage(){
    return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}