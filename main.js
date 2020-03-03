const addButtons = document.querySelectorAll(".add-button");
const formContainer = document.getElementById("form-container");
const tableBody = document.getElementById("table-body");
const submit = document.getElementById("submit");
let deleteButtons = document.querySelectorAll(".delete");

let myLibrary = [];
let lastBookNumber = 1;

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    formContainer.style.display = "block";
  });
});

function addDeleteButtons(){
  deleteButtons = document.querySelectorAll(".delete");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      console.log(button.getAttribute("data-book"));
      deleteBook (button.getAttribute("data-book"));
    });
  });
}

function deleteBook (number){
  let toDelete = document.querySelector(`tr[data-book="${number}"]`);
  toDelete.remove();
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(bookArgs) {
  let book = new Book (...bookArgs);
  myLibrary.push(book);
}

function render(){
  let row = document.createElement("tr");
  row.setAttribute("data-book", parseInt(lastBookNumber)+1);

  if((parseInt(lastBookNumber)+1) % 2 === 0){ //Adds color to every other row
    row.classList.add("color-row");
  }

  for (let item in myLibrary[myLibrary.length-1]){
    let cell = document.createElement("td");
    cell.append(myLibrary[myLibrary.length-1][item]);
    row.append(cell);
  }

  let cell = document.createElement("td");
  let button = document.createElement("button");
  let icon = document.createElement("ion-icon");
  icon.setAttribute("name", "trash-outline");
  button.classList.add("delete");
  button.setAttribute("type", "button");
  button.setAttribute("data-book", parseInt(lastBookNumber)+1);

  button.append(icon);
  cell.append(button);
  row.append(cell);

  tableBody.insertBefore(row, tableBody.firstChild);
  lastBookNumber = tableBody.firstElementChild.getAttribute("data-book");

  addDeleteButtons();
}

submit.addEventListener("click", (e) => {
  e.preventDefault();
  
  let form = document.querySelector("form");
  let bookArgs = [];

  for (let element of form.elements){
    if (element.id === "read"){
      element.checked ? bookArgs.push ("Yes") : bookArgs.push ("No");
      element.checked = false;
    }else{
      bookArgs.push (element.value);
      if (element.id !== "submit"){
        element.value = "";
      }
    }
  }

  formContainer.style.display = "none";
  addBookToLibrary(bookArgs);
  render();
});

addDeleteButtons();