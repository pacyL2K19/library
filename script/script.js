let myLibrary = [];
let selector = document.getElementById("show");

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
  console.log(document.getElementById("read").checked);
  let title = document.getElementById("title").value
  let author = document.getElementById("author").value
  let pages = document.getElementById("pages").value
  let readCheck = document.getElementById("read").checked == true ? "Mark as unreaded" : "Mark as readed"

  const book = new Book(title, author, pages, readCheck)

  addBookToLibrary(book)
  console.log(myLibrary)

  let icon = document.createElement("i")
  icon.classList.add("far")
  icon.classList.add("fa-trash-alt")
  icon.classList.add("text-light")
  let mainDivCard = document.createElement("div")
  let imageCard = document.createElement("img")
  let cardBody = document.createElement("div")
  let cardTile = document.createElement("h5")
  let cardAuthor = document.createElement("p")
  let cardDescription = document.createElement("em")
  let readBtn = document.createElement("button")
  readBtn.classList.add("btn")
  readBtn.classList.add("btn-primary")
  readBtn.innerHTML = readCheck

  let readBtn2 = document.createElement("button")
  readBtn2.classList.add("btn")
  readBtn2.classList.add("btn-primary")
  readBtn2.classList.add("mx-1")
  readBtn2.appendChild(icon)

  cardTile.classList.add("card-title")
  cardAuthor.classList.add("card-text")
  imageCard.classList.add("card-img-top")
  imageCard.src="https://miro.medium.com/max/820/1*1uTX2gdtlj9gsKxbiOc6LQ.jpeg"
  imageCard.alt = "Card image"
  cardTile.innerHTML = book.title
  cardDescription.innerHTML = `Status: ${book.pages} pages ${readCheck ? `Readed` : `Unreaded`}`
  cardAuthor.innerHTML = book.author
  cardBody.classList.add("card-body")
  cardBody.appendChild(cardTile)
  cardBody.appendChild(cardAuthor)
  cardBody.appendChild(cardDescription)
  cardBody.appendChild(readBtn)
  cardBody.appendChild(readBtn2)

  mainDivCard.classList.add("card")
  mainDivCard.classList.add("col-3")
  mainDivCard.classList.add("mx-3")
  mainDivCard.classList.add("my-3")

  mainDivCard.appendChild(imageCard)
  mainDivCard.appendChild(cardBody)

  selector.appendChild(mainDivCard);
  document.getElementById("title").value = ""
  document.getElementById("author").value = ""
  document.getElementById("pages").value = ""
  document.getElementById("read").checked = false
  alert("Books added to the library successfully");

})