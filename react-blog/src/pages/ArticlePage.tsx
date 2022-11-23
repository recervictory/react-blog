import React from "react";
import { useParams } from "react-router-dom";

import articles from "../assets/articles";
import NotFoundPage from "./NotFoundPage";

const ArticlePage = () => {
  const { articleId } = useParams();
  const article = articles.find((article) => article.name === articleId);

  
  //! If no article found Not found Page returned
  if (!article) {
    return <NotFoundPage/>
  }

  const { name, title, content } = article;
  return (
    <>
      <h1>{title}</h1>
      { content.map ( (paragraph, index) => <p key={index}>{paragraph}</p>)}
    </>
  );
};

export default ArticlePage;
