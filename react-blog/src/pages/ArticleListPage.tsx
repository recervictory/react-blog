import React from 'react'
import articles from '../assets/articles';
import {Link} from 'react-router-dom';
import ArticlesList from '../components/ArticlesList';

const ArticleListPage = () => {
  return (
    <div>
      <h1>Articles</h1>
      <ArticlesList articles={articles} />
    </div>
  )
}

export default ArticleListPage
