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
  let mainDivCard = document.createElement("div")
  let imageCard = document.createElement("img")
  let cardBody = document.createElement("div")
  let cardTile = document.createElement("h5")
  let cardAuthor = document.createElement("p")
  let readBtn = document.createElement("button")
  readBtn.classList.add("btn")
  readBtn.classList.add("btn-primary")
  readBtn.innerHTML = "Readed"

  cardTile.classList.add("card-title")
  cardAuthor.classList.add("card-text")
  imageCard.classList.add("card-img-top")
  imageCard.src="https://miro.medium.com/max/820/1*1uTX2gdtlj9gsKxbiOc6LQ.jpeg"
  imageCard.alt = "Card image"
  cardTile.innerHTML = book1.title
  cardAuthor.innerHTML = book1.author
  cardBody.classList.add("card-body")
  cardBody.appendChild(cardTile)
  cardBody.appendChild(cardAuthor)
  cardBody.appendChild(readBtn)

  mainDivCard.classList.add("card")
  mainDivCard.classList.add("col-4")

  mainDivCard.appendChild(imageCard)
  mainDivCard.appendChild(cardBody)

  selector.appendChild(mainDivCard);

})