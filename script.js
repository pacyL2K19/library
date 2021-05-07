let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary() {
  // do stuff here
}

const book1 = new Book('Star Wars', 'George Lucas', 1000, 'not read yet')
console.log(book1.Info())