import React from 'react';
import { useParams } from 'react-router-dom';

const ArticleDetails: React.FC = () => {
    const { id } = useParams(); 
    const saved = localStorage.getItem('articles');
    const articles = saved ? JSON.parse(saved) : [];
    
    const article = articles.find((a: any) => a.id.toString() === id);

    if (!article) return <div>Nie znaleziono artykułu</div>;

    return (
        <div>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
        </div>
    );
};

export default ArticleDetails;