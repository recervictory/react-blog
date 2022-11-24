import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import CommentList from "../components/CommentList";
import articles from "../assets/articles";
import NotFoundPage from "./NotFoundPage";
import axios from "axios";
import CommentFrom from "../components/CommentFrom";

axios.defaults.baseURL = `http://localhost:8000`;

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });
  const { articleId } = useParams();
  const article = articles.find((article) => article.name === articleId);

  useEffect(() => {
    const loadArticleInfo = async () => {
      const response = await axios.get(`/api/articles/${articleId}`);
      setArticleInfo(response.data);
    };
    loadArticleInfo();
  }, []);

  const addVote = async () => {
    const response = await axios.put(`/api/articles/${articleId}/upvote`);
    setArticleInfo(response.data);
  };

  //! If no article found Not found Page returned
  if (!article) {
    return <NotFoundPage />;
  }

  const { name, title, content } = article;
  return (
    <>
      <div className="upvote-section">
        <h1>{title}</h1>
        <button onClick={addVote}>Upvote</button>
      </div>
      <p>This article has {articleInfo.upvotes} upvotes</p>
      {content.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
     {articleInfo.comments.length > 0 && <CommentList comments={articleInfo.comments} />}
      <CommentFrom articleName={articleId} 
      onArticleUpadted={ updatedArticle => setArticleInfo(updatedArticle)
      }
      />
    </>
  );
};

export default ArticlePage;
