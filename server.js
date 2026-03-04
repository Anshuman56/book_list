let express = require('express');
let app = express();

app.use(express.urlencoded({extended: true}))

app.get('/', (request, response) =>{
    response.sendFile(__dirname + '/index.html')
})

app.post('/addbook', (request, response) =>{
    console.log(request.body)
})
app.listen(8000, (request, response) => {
    console.log('go to localhost//:8000')
})