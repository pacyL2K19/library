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

let addBtn = document.getElementById("add-book")

addBtn.addEventListener('click', function () {
  const book1 = new Book('Star Wars', 'George Lucas', 1000, false)
  addBookToLibrary(book1)
  console.log(myLibrary)
})
