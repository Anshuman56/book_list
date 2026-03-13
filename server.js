let express = require('express');
const { ObjectId } = require('mongodb');
let app = express();
const MongoClient = require('mongodb').MongoClient;
require("dotenv").config();

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(express.json())


MongoClient.connect(process.env.MONGO_URL)
.then( client => {
    console.log('Connected to the database');
    const db = client.db('books-list');
    const booksCollection = db.collection('books');

    app.post('/addbook', (request, response) =>{
        booksCollection.insertOne(request.body)
        .then(result => response.redirect('/'))
        .catch(err => console.error(err))
    })

    app.get('/', (request, response) => {
      booksCollection.find().toArray()
        .then(result => {
            response.render('index.ejs', {books: result})
        })
        .catch(err => console.error(err))
        
    })

    app.delete('/deleteBook', (request, response) =>{
        booksCollection.deleteOne({bookName: request.body.bookName})
        .then(result => {
            response.json('book was deleted')
        })
        .catch(err => console.error(err))
    })

    app.put('/updateBook',(request, response) =>{
        let id = new ObjectId(request.body.id)
       booksCollection.findOneAndUpdate(
        {_id:id},
        {$set: {
            bookName: request.body.name,
            bookAuthorName: request.body.author
        },},
        {
            upsert: true,
        },
       )
       .then(result => response.json('Success'))
       .catch(err => console.error(err))
    })
})
.catch(err => console.error(err))




app.listen(8000, (request, response) => {
    console.log('go to localhost//:8000')
})