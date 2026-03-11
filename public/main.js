const del = document.querySelectorAll('#del');
const edit = document.querySelectorAll('#edit');

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

    console.log(nameOfThebook)
    console.log(nameofTheAuthorOfTheBook)
}