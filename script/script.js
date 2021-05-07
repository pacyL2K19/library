let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

Book.prototype.info = function () {
  let hasRead = this.read ? "already" : "never"
  return `${this.title} ${this.author} has ${this.pages} pages ${hasRead} read this book`
}

function addBookToLibrary(book) {
  myLibrary.push(book)
}

const displayBooks = (library) => {
  let selector = document.getElementById("show");
  for (let i = 0; i < library.length; i++) {

  }
}

let addBtn = document.getElementById("add-book")

addBtn.addEventListener('click', function () {
  let selector = document.getElementById("show");
  const book1 = new Book('Star Wars', 'George Lucas', 1000, false)
  addBookToLibrary(book1)
  console.log(myLibrary)
  displayBooks(myLibrary)
  let paragraph = document.createElement("p")
  paragraph.innerHTML = book1.info()
  let newBook = document.createElement("div")
  newBook.appendChild(paragraph)
  selector.appendChild(newBook);
})