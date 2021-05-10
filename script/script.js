let myLibrary = [];
let selector = document.getElementById("show");
let mainDivCard = document.createElement("div")
let imageCard = document.createElement("img")
let cardBody = document.createElement("div")
let cardTile = document.createElement("h5")
let cardAuthor = document.createElement("p")
let cardDescription = document.createElement("em")
let readBtn = document.createElement("button")
let icon = document.createElement("i")

const handleRemove = (index) => {
  myLibrary.splice(index, 1)
  while (selector.firstChild) {
    selector.removeChild(selector.firstChild);
  }

  console.log(myLibrary)
}

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

const displayBooks = () => {
  let title = document.getElementById("title").value
  let author = document.getElementById("author").value
  let pages = document.getElementById("pages").value
  let readCheck = document.getElementById("read").checked == true ? "Mark as unreaded" : "Mark as readed"

  const book = new Book(title, author, pages, readCheck)
  addBookToLibrary(book)
  console.log(myLibrary);

  while (selector.firstChild) {
    selector.removeChild(selector.firstChild);
  }
  // selector has zero children
  for (let book in myLibrary) {
    // let icon = document.createElement("i")
    icon.classList.add("far")
    icon.classList.add("fa-trash-alt")
    icon.classList.add("text-light")
    // let mainDivCard = document.createElement("div")
    // let imageCard = document.createElement("img")
    // let cardBody = document.createElement("div")
    // let cardTile = document.createElement("h5")
    // let cardAuthor = document.createElement("p")
    // let cardDescription = document.createElement("em")
    // let readBtn = document.createElement("button")
    readBtn.classList.add("btn")
    readBtn.classList.add("btn-primary")
    readBtn.innerHTML = readCheck

    let removeButton = document.createElement("button")
    removeButton.classList.add("btn")
    removeButton.classList.add("btn-primary")
    removeButton.classList.add("mx-1")
    removeButton.appendChild(icon)
    removeButton.id = myLibrary.length - 1

    removeButton.addEventListener("click", function (event) {
      handleRemove(removeButton.id)
    })

    cardTile.classList.add("card-title")
    cardAuthor.classList.add("card-text")
    imageCard.classList.add("card-img-top")
    imageCard.src = "https://miro.medium.com/max/820/1*1uTX2gdtlj9gsKxbiOc6LQ.jpeg"
    imageCard.alt = "Card image"
    cardTile.innerHTML = book.title
    cardDescription.innerHTML = `Status: ${book.pages} pages ${readCheck ? `Readed` : `Unreaded`}`
    cardAuthor.innerHTML = book.author
    cardBody.classList.add("card-body")
    cardBody.appendChild(cardTile)
    cardBody.appendChild(cardAuthor)
    cardBody.appendChild(cardDescription)
    cardBody.appendChild(readBtn)
    cardBody.appendChild(removeButton)

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
  }

}

let addBtn = document.getElementById("add-book")

addBtn.addEventListener('click', function () {
  // console.log(myLibrary)
  displayBooks(myLibrary)
  alert("Books added to the library successfully");

})