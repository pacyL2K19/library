import {
  getDomElement,
  setInnerHTML,
  setValue,
  setCheckedValue,
  getAllElementsOfType,
  addEvent,
} from './dom.js';

const myLibrary = [];

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
  this.updateReadStatus = function () {
    this.readStatus = !this.readStatus;
  };
}

function getUserInput() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const readStatus = document.getElementById("read").checked;

  return {
    title,
    author,
    pages,
    readStatus,
  };
}

function validateForm(obj) {
  const formValues = Object.values(obj);
  for (let i = 0; i < formValues.length; i += 1) {
    if (formValues[i].length === 0) return false;
  }

  return true;
}

function notifyUser(obj) {
  const titleNotice = getDomElement('#title-notice');
  const authorNotice = getDomElement('#author-notice');
  const pagesNotice = getDomElement('#pages-notice');

  if (obj.title.length === 0) {
    setInnerHTML(titleNotice, 'Title is required');
  }

  if (obj.author.length === 0) {
    setInnerHTML(authorNotice, 'Author is required');
  }

  if (obj.pages.length === 0) {
    setInnerHTML(pagesNotice, 'Number of pages is required');
  }
}

function cleanNoticeBoard() {
  setInnerHTML(getDomElement('#title-notice'), '');
  setInnerHTML(getDomElement('#author-notice'), '');
  setInnerHTML(getDomElement('#pages-notice'), '');
}

function cleanForm() {
  setValue(getDomElement('#title'), '');
  setValue(getDomElement('#author'), '');
  setValue(getDomElement('#pages'), '');
  setCheckedValue(getDomElement('#checkbox'), false);
}

function addCard(arr, obj) {
  const card = `<div class='col-sm-4 my-2'>
    <div class='card text-center text-dark bg-light'>
      <div class='card-header'>
        ${obj.title}
      </div>
      <div class='card-body'>
        <h5 class='card-title'>${obj.author}</h5>
        <p class='card-text'>${obj.pages} pages</p>
        <a href='#' class="btn ${obj.readStatus ? 'btn-success' : 'btn-primary'} toggle" data-index-number="${arr.indexOf(obj)}">${obj.readStatus ? 'Read' : 'Not read'}</a>
        <a href='#' class='btn btn-danger dlt-button' data-index-number="${arr.indexOf(obj)}">Delete</a>
      </div>
    </div>
  </div>`;

  return card;
}

function printCard(arr) {
  const markup = arr.map(elt => addCard(arr, elt)).join('');
  const booksList = getDomElement('#books_list');
  setInnerHTML(booksList, markup);
  const allDeleteBtn = getAllElementsOfType('.dlt-button');
  const allToggleBtn = getAllElementsOfType('.toggle');

  addEvent(allDeleteBtn, 'click', deleteOneCard);
  addEvent(allToggleBtn, 'click', toggleBookStatus);
}

// eslint-disable-next-line consistent-return
function addBookToLibrary() {
  cleanNoticeBoard();

  const formIsValid = validateForm(getUserInput());
  if (!formIsValid) return notifyUser(getUserInput());

  const {
    title, author, pages, readStatus,
  } = getUserInput();
  const newBook = new Book(title, author, pages, readStatus);
  myLibrary.push(newBook);
}

const addBook = getDomElement('#addBook');
const newBook = getDomElement('#toggle-add-book');

function toggleNewBook() {
  const elt = newBook;
  const form = getDomElement('.form_book');
  elt.classList.toggle('d-none');
  form.classList.toggle('d-none');
}

addBook.addEventListener('click', () => {
  addBookToLibrary();
  printCard(myLibrary);
  cleanForm();
  toggleNewBook();
});

function deleteOneCard(event) {
  const clickedButton = event.currentTarget;
  const correspondingBookIndex = clickedButton.dataset.indexNumber;
  myLibrary.splice(correspondingBookIndex, 1);
  printCard(myLibrary);
}

function toggleBookStatus(event) {
  const bookIndex = event.currentTarget.dataset.indexNumber;
  const book = myLibrary[bookIndex];
  book.updateReadStatus();
  printCard(myLibrary);
}

newBook.addEventListener('click', toggleNewBook);

// let myLibrary = [];
// let selector = document.getElementById("show");

// const populateList = () => {
//   for (let book of myLibrary) {
//     let removeButton = document.createElement("button")
//     let icon = document.createElement("i")
//     icon.classList.add("far")
//     icon.classList.add("fa-trash-alt")
//     icon.classList.add("text-light")
//     let mainDivCard = document.createElement("div")
//     let imageCard = document.createElement("img")
//     let cardBody = document.createElement("div")
//     let cardTile = document.createElement("h5")
//     let cardAuthor = document.createElement("p")
//     let cardDescription = document.createElement("em")
//     let readBtn = document.createElement("button")
//     readBtn.classList.add("btn")
//     readBtn.classList.add("btn-primary")
//     readBtn.innerHTML = book.read
//     removeButton.classList.add("btn")
//     removeButton.classList.add("btn-primary")
//     removeButton.classList.add("mx-1")
//     removeButton.appendChild(icon)
//     removeButton.id = myLibrary.length - 1

//     removeButton.addEventListener("click", function (event) {
//       handleRemove(removeButton.id)
//     })

//     cardTile.classList.add("card-title")
//     cardAuthor.classList.add("card-text")
//     imageCard.classList.add("card-img-top")
//     imageCard.src = "https://miro.medium.com/max/820/1*1uTX2gdtlj9gsKxbiOc6LQ.jpeg"
//     imageCard.alt = "Card image"
//     cardTile.innerHTML = book.title
//     cardDescription.innerHTML = `Status: ${book.pages} pages ${book.read === 'Mark as unreaded' ? `Readed` : `Unreaded`}`
//     cardAuthor.innerHTML = book.author
//     cardBody.classList.add("card-body")
//     cardBody.appendChild(cardTile)
//     cardBody.appendChild(cardAuthor)
//     cardBody.appendChild(cardDescription)
//     cardBody.appendChild(readBtn)
//     cardBody.appendChild(removeButton)

//     mainDivCard.classList.add("card")
//     mainDivCard.classList.add("col-3")
//     mainDivCard.classList.add("mx-3")
//     mainDivCard.classList.add("my-3")

//     mainDivCard.appendChild(imageCard)
//     mainDivCard.appendChild(cardBody)

//     selector.appendChild(mainDivCard);
//     console.log("Appended");
//   }

// }

// const handleRemove = (index) => {
//   myLibrary.splice(index, 1)
//   while (selector.firstChild) {
//     selector.removeChild(selector.firstChild);
//   }
//   populateList()
//   console.log(myLibrary)
// }

// function Book(title, author, pages, read) {
//   this.title = title
//   this.author = author
//   this.pages = pages
//   this.read = read
// }

// Book.prototype.info = function () {
//   let hasRead = this.read ? "already" : "never"
//   return `${this.title} ${this.author} has ${this.pages} pages ${hasRead} read this book`
// }

// function addBookToLibrary(book) {
//   myLibrary.push(book)
// }

// const displayBooks = () => {
//   let title = document.getElementById("title").value
//   let author = document.getElementById("author").value
//   let pages = document.getElementById("pages").value
//   let readCheck = document.getElementById("read").checked == true ? "Mark as unreaded" : "Mark as readed"

//   const book = new Book(title, author, pages, readCheck)
//   addBookToLibrary(book)
//   console.log(myLibrary);

//   while (selector.firstChild) {
//     selector.removeChild(selector.firstChild);
//   }
//   // selector has zero children
//   populateList()
// }

// let addBtn = document.getElementById("add-book")

// addBtn.addEventListener('click', function () {
//   displayBooks(myLibrary)
//   alert("Books added to the library successfully");
//   document.getElementById("title").value = ""
//   document.getElementById("author").value = ""
//   document.getElementById("pages").value = ""
//   document.getElementById("read").checked = false

// })