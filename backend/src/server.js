import express from "express";
import {db, connectToDb} from "./db.js"


const app = express();
//* IF post have json payload  express convert it to body
app.use(express.json());

//* End Point
app.get('/api/articles/:name', async (request, response) => {
  const {name} = request.params;
  const article = await db.collection('articles').findOne({name});

  if (article) {
    response.json(article);
  } else {
    response.sendStatus(404);
  }
 
})


app.put('/api/articles/:name/upvote', async (request, response) => {
    
    const {name} = request.params;
    
    await db.collection('articles').updateOne({name},{
      // $inc Increment  upade value to 1
      $inc: {upvotes: 1},
    });

    const article = await db.collection('articles').findOne({name})

    if (article) {
        response.send(`The ${name} article now has upvotes ${article.upvotes}`);
    } else {
        response.send(`The ${name} article doesn't exist`);
    }
});

app.post('/api/articles/:name/comments', async (request, response) => {

    const {name} = request.params;
    const {postedBy, text} = request.body;

    await db.collection('articles').updateOne({name}, {
      $push: {comments: {postedBy, text}},
    });
    
    const article = await db.collection('articles').findOne({name});

    if (article) {
        response.send(article.comments);
    } else {
        response.send(`The ${name} article doesn't exist`);
    }
})



connectToDb( () => {
  app.listen(8000, () => {
  console.log("====================================");
  console.log("Server is listening on port 8000");
  console.log("====================================");
});
})