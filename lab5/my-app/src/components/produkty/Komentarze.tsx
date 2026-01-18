import React, { useEffect, useState } from 'react';
import Komentarz, { type KomentarzData } from './Komentarz';

const Komentarze: React.FC = () => {
    const [comments, setComments] = useState<KomentarzData[]>([]);

    useEffect(() => {
        fetch('https://dummyjson.com/comments')
            .then(res => res.json())
            .then(data => {
                setComments(data.comments);
            })
            .catch(err => console.error("Błąd pobierania:", err));
    }, []); 

    return (
        <div>
            <h2>Komentarze (z API)</h2>
            {comments.map(comment => (
                <Komentarz 
                    key={comment.id}
                    {...comment}
                />
            ))}
        </div>
    );
};

export default Komentarze;