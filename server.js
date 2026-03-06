let express = require('express');
let app = express();
const MongoClient = require('mongodb').MongoClient;
require("dotenv").config();

app.use(express.urlencoded({extended: true}))


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
})
.catch(err => console.error(err))

app.get('/', (request, response) =>{
    response.sendFile(__dirname + '/index.html')
})



app.listen(8000, (request, response) => {
    console.log('go to localhost//:8000')
})