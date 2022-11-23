import React from 'react'
import articles from '../assets/articles';
import {Link} from 'react-router-dom';

const ArticleListPage = () => {
  return (
    <div>
      {articles.map(article => (
      <Link key={article.name} className="article-list-item" to={`/articles/${article.name}`}>
        <h3>{article.title}</h3>
        <p>{article.content[0].substring(0,150)}</p>
      </Link>
    ))}
    </div>
  )
}

export default ArticleListPage
