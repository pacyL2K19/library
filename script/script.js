/* eslint-disable import/extensions */
/* eslint-disable no-use-before-define */
import {
  getDomElement,
  setInnerHTML,
  resetValue,
  getAllElementsOfType,
  handleEvent,
} from './dom.js';

const myLibrary = [];

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
  this.updateReadStatus = () => {
    this.readStatus = !this.readStatus;
  };
}

const getUserInput = () => {
  const title = getDomElement('#title').value;
  const author = getDomElement('#author').value;
  const pages = getDomElement('#pages').value;
  const readStatus = getDomElement('#read').checked;

  return {
    title,
    author,
    pages,
    readStatus,
  };
};

const validateForm = (form) => {
  const formValues = Object.values(form);
  for (let i = 0; i < formValues.length; i += 1) {
    if (formValues[i].length === 0) return false;
  }

  return true;
};

const addCard = (library, book) => {
  const card = `<div class="card col-4" style="width: 18rem;">
    <img class="card-img-top" src="https://miro.medium.com/max/820/1*1uTX2gdtlj9gsKxbiOc6LQ.jpeg" alt="Card image cap">
    <div class="card-body">
        <h5 class="card-title">${book.title}</h5>
        <p class="card-text">${book.author}</p>
        <p class="card-text"><em>${book.pages} Pages</em></p>
        <a href='#' class="btn ${book.readStatus
    ? 'btn-success'
    : 'btn-primary'} toggle" data-index-number="${library.indexOf(
  book,
)}">${book.readStatus ? 'Read' : 'Not read'}</a>
        <a href='#' class='btn btn-danger removeBtn' data-index-number="${library.indexOf(
    book,
  )}">Delete</a>
    </div>
  </div>`;

  return card;
};

const deleteOneCard = (event) => {
  const clickedButton = event.currentTarget;
  const correspondingBookIndex = clickedButton.dataset.indexNumber;
  myLibrary.splice(correspondingBookIndex, 1);
  printCard(myLibrary);
};

const toggleBookStatus = (event) => {
  const bookIndex = event.currentTarget.dataset.indexNumber;
  const book = myLibrary[bookIndex];
  book.updateReadStatus();
  printCard(myLibrary);
};

const printCard = (library) => {
  const markup = library.map((elt) => addCard(library, elt)).join('');
  const booksList = getDomElement('#show');
  setInnerHTML(booksList, markup);
  const deleteBtns = getAllElementsOfType('.removeBtn');
  const toggleBtns = getAllElementsOfType('.toggle');
  handleEvent(deleteBtns, 'click', deleteOneCard);
  handleEvent(toggleBtns, 'click', toggleBookStatus);
};

const clearAlerts = () => {
  const warningALert = getDomElement('#warning-alert');
  const successWarning = getDomElement('#success-alert');
  setTimeout(() => {
    if (!successWarning.classList.contains('d-none')) successWarning.classList.add('d-none');
    if (!warningALert.classList.contains('d-none')) warningALert.classList.add('d-none');
  }, 1000);
};

const notifyUserWarning = () => {
  const warningALert = getDomElement('#warning-alert');
  const successWarning = getDomElement('#success-alert');
  successWarning.classList.add('d-none');
  warningALert.classList.remove('d-none');
  clearAlerts();
};

const notifyUserSuccess = () => {
  const warningALert = getDomElement('#warning-alert');
  const successWarning = getDomElement('#success-alert');
  successWarning.classList.remove('d-none');
  warningALert.classList.add('d-none');
  clearAlerts();
};

const cleanForm = () => {
  resetValue(getDomElement('#title'), '');
  resetValue(getDomElement('#author'), '');
  resetValue(getDomElement('#pages'), '');
  resetValue(getDomElement('#read'), false);
};

const addBookToLibrary = () => {
  const formIsValid = validateForm(getUserInput());
  if (!formIsValid) return notifyUserWarning();

  const {
    title, author, pages, readStatus,
  } = getUserInput();
  const newBook = new Book(title, author, pages, readStatus);
  myLibrary.push(newBook);
  return notifyUserSuccess();
};

const addBook = getDomElement('#add-book');

addBook.addEventListener('click', () => {
  addBookToLibrary();
  printCard(myLibrary);
  cleanForm();
});
