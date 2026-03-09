

const del = document.querySelectorAll('#del');
del.forEach(item => {
    item.addEventListener('click', deleteTheBook)
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