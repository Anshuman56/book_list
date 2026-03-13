const del = document.querySelectorAll('#del');
const edit = document.querySelectorAll('#edit');
const update = document.querySelector('#update');
let id = '';

del.forEach(item => {
    item.addEventListener('click', deleteTheBook)
})

edit.forEach(item => {
    item.addEventListener('click', editTheBook)
})

function deleteTheBook(){
    let booksName = this.parentNode.childNodes[1].innerText;
    fetch('/deleteBook', {
        method: 'delete',
        headers: {'Content-type' : 'application/json'},
        body: JSON.stringify({
            bookName:booksName
        })
    })
    .then(res => {
        if(res.ok) return res.json()
    })
    .then(data => window.location.reload())
}

function editTheBook(){
    let nameOfThebook = this.parentNode.childNodes[1].innerText;
    let nameofTheAuthorOfTheBook = this.parentNode.childNodes[3].innerText;
    id = this.dataset.id;
    
   document.getElementById('updateBookName').value = nameOfThebook;
   document.getElementById('updateBookAuthorName').value = nameofTheAuthorOfTheBook;
    
}

update.addEventListener('click', () =>{
    let name = document.getElementById('updateBookName').value;
    let author = document.getElementById('updateBookAuthorName').value;
   
    fetch('/updateBook', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id,
            name,
            author
        })
    })
      .then(res => {
    if (res.ok) return res.json()
  })
  .then(response => {
    window.location.reload(true)
  })
})