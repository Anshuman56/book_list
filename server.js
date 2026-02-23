let express = require('express');
let app = express();

app.get('/', (request, response) =>{
    response.sendFile(__dirname + '/index.html')
})

app.listen(8000, (request, response) => {
    console.log('go to localhost//: 8000')
})