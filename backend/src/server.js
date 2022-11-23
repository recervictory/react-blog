import express from 'express';

const app = express();
//* IF post have json payload  express convert it to body
app.use(express.json());

app.get('/hello', (request, response) => {
    response.send("Hello From Server");
})

app.post('/hello', (request, response) => {
    response.send(`${request.body.name}, You Not Again! `);
})

app.listen(8000, () => {
    console.log('====================================');
    console.log('Server is listening on port 8000');
    console.log('====================================');
})