import express from "express";
import {MongoClient} from "mongodb";

let articlesInfo = [
  {
    name: "learn-react",
    upvotes: 0,
    comments: [],
  },
  {
    name: "learn-node",
    upvotes: 0,
    comments: [],
  },
  {
    name: "mongodb",
    upvotes: 0,
    comments: [],
  },
];



const app = express();
//* IF post have json payload  express convert it to body
app.use(express.json());

//* End Point
app.get('/api/articles/:name', async (request, response) => {
  const {name} = request.params;

  const client = new MongoClient('mongodb://127.0.0.1:27017');
  await client.connect();

  const db = client.db('react-blog-db');
  const article = await db.collection('articles').findOne({name});
  
 response.json(article);
})


app.put('/api/articles/:name/upvote', (request, response) => {
    console.log("Article Upvote response Triggere...");
    const {name} = request.params;
    const article = articlesInfo.find(article => article.name === name);

    if (article) {
        article.upvotes += 1;
        response.send(`The ${name} article now has upvotes ${article.upvotes}`);
    } else {
        response.send(`The ${name} article doesn't exist`);
    }
});

app.post('/api/articles/:name/comments', (request, response) => {
    console.log("comment Upvote response Triggere...");
    const {name} = request.params;
    const {postedBy, text} = request.body;
    
    const article = articlesInfo.find(article => article.name === name);
    if (article) {
        article.comments.push({postedBy, text});
        response.send(article.comments);
    } else {
        response.send(`The ${name} article doesn't exist`);
    }
})

app.listen(8000, () => {
  console.log("====================================");
  console.log("Server is listening on port 8000");
  console.log("====================================");
});
