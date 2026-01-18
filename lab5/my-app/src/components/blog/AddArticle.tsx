import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddArticle: React.FC = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate(); 

    const handleAdd = () => {
        const newArticle = {
            id: Date.now(), 
            title,
            content
        };

        const saved = localStorage.getItem('articles');
        const articles = saved ? JSON.parse(saved) : [];
        articles.push(newArticle);

        localStorage.setItem('articles', JSON.stringify(articles));

        navigate('/blog');
    };

    return (
        <div>
            <h2>Dodaj Artykuł</h2>
            <input placeholder="Tytuł" value={title} onChange={e => setTitle(e.target.value)} /><br/>
            <textarea placeholder="Treść" value={content} onChange={e => setContent(e.target.value)} /><br/>
            <button onClick={handleAdd}>DODAJ</button>
        </div>
    );
};

export default AddArticle;