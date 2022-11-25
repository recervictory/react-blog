import express from "express";
import cors from 'cors';

import {db, connectToDb} from "./db.js";
import fs from "fs";
import admin from 'firebase-admin';


const credentials = JSON.parse(
  fs.readFileSync('./credentials.json')
);

admin.initializeApp({
  credential: admin.credential.cert(credentials),
})

const app = express();
//* IF post have json payload  express convert it to body
app.use(express.json());


app.use( async (request, response, next) => {
  const {authToken} = request.headers;

  if (authToken) {
    try {
      request.user = await admin.auth().verifyIdToken(authToken);
    } catch (e) {
      response.sendStatus(404);
    }
  }
  request.user = request.user || {};
  next();
})

app.use( (request, response, next) => {
  if (request.user) {
    next();
  } else {
    response.sendStatus(401);
  }
})

app.use(cors());

//* End Point
app.get('/api/articles/:name', async (request, response) => {
  console.log("get end point")
  const {name} = request.params;
  const {uid} = request.user;

  const article = await db.collection('articles').findOne({name});
  console.log(article);
  if (article) {
    const upVoteIds = article.upvoteIds || [];
    article.canUpVote = uid && !upVoteIds.includes(uid)
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
        response.send(article);
    } else {
        response.sendStatus(404);
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
        response.send(article);
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