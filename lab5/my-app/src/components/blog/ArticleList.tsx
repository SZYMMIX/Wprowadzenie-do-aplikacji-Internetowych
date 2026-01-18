import React from 'react';
import { Link } from 'react-router-dom';

const ArticleList: React.FC = () => {
    const saved = localStorage.getItem('articles');
    const articles = saved ? JSON.parse(saved) : [];

    return (
        <div>
            <h2>Lista Artykułów</h2>
            <ul>
                {articles.map((art: any) => (
                    <li key={art.id}>
                        <Link to={`/article/${art.id}`}>{art.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ArticleList;