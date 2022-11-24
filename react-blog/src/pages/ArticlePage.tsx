import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import articles from "../assets/articles";
import NotFoundPage from "./NotFoundPage";
import axios from "axios";

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: 0 });
  const { articleId } = useParams();
  const article = articles.find((article) => article.name === articleId);

  useEffect(() => {
    const loadArticleInfo = async () => {
      const response = await axios.get(
        `/api/articles/${articleId}`
      );
      setArticleInfo(response.data());
      loadArticleInfo();
    };
  }, []);

  //! If no article found Not found Page returned
  if (!article) {
    return <NotFoundPage />;
  }

  const { name, title, content } = article;
  return (
    <>
      <h1>{title}</h1>
      <p>This article has {articleInfo.upvotes} upvotes</p>
      {content.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </>
  );
};

export default ArticlePage;
