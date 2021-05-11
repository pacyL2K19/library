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

function notifyUser() {
  alert("The form is not valid");
}

function cleanForm() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("read").checked = false;
}

function addCard(library, book) {
  const card = `<div class="card col-4" style="width: 18rem;">
    <img class="card-img-top" src="https://miro.medium.com/max/820/1*1uTX2gdtlj9gsKxbiOc6LQ.jpeg" alt="Card image cap">
    <div class="card-body">
        <h5 class="card-title">${book.title}</h5>
        <p class="card-text">${book.author}</p>
        <p class="card-text"><em>${book.pages} Pages</em></p>
        <a href='#' class="btn ${book.readStatus ? 'btn-success' : 'btn-primary'} toggle" data-index-number="${library.indexOf(book)}">${book.readStatus ? 'Read' : 'Not read'}</a>
        <a href='#' class='btn btn-danger removeBtn' data-index-number="${library.indexOf(book)}">Delete</a>
    </div>
  </div>`

  return card;
}

function printCard(library) {
  const markup = library.map(elt => addCard(library, elt)).join('');
  const booksList = document.getElementById("show");
  booksList.innerHTML = markup;
  const deleteBtns = document.querySelectorAll(".removeBtn");
  const toggleBtns = document.querySelectorAll('.toggle');
  deleteBtns.forEach(btn => btn.addEventListener('click', deleteOneCard));
  toggleBtns.forEach(btn => btn.addEventListener('click', toggleBookStatus));
}

function addBookToLibrary() {
  const formIsValid = validateForm(getUserInput());
  if (!formIsValid) return notifyUser();

  const { title, author, pages, readStatus } = getUserInput();
  const newBook = new Book(title, author, pages, readStatus);
  myLibrary.push(newBook);
}

const addBook = document.getElementById("add-book");

addBook.addEventListener('click', () => {
  addBookToLibrary();
  printCard(myLibrary);
  cleanForm();
  // toggleNewBook();
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
