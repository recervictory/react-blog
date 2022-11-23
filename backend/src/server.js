import express from "express";

let articlesInfo = [
  {
    name: "learn-react",
    upvotes: 0,
  },
  {
    name: "learn-node",
    upvotes: 0,
  },
  {
    name: "mongodb",
    upvotes: 0,
  },
];

const app = express();
//* IF post have json payload  express convert it to body
app.use(express.json());

//* End Point
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

app.listen(8000, () => {
  console.log("====================================");
  console.log("Server is listening on port 8000");
  ("====================================");
});
