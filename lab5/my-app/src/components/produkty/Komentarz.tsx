import React, {useState} from "react"

export interface User {
    id: number;
    username: string;
    fullName: string;
}

export interface KomentarzData{
    id: number;
    body: string;
    postId: number;
    likes: number;
    user: User;
}


const Komentarz: React.FC<KomentarzData> = ({ id, body, postId, likes, user }) => {
    const [likeCount, setLikeCount] = useState(likes);

    return (
        <div style={{ border: '1px solid #ccc', padding: '30px', marginBottom: '10px', borderRadius: '5px', backgroundColor: '#e9cc97e8' }}>
            <div style={{ fontWeight: 'bold', fontSize: '1.2em'}}>{user.fullName} (@{user.username})</div>
            <p style={{ fontSize: '1.2em'}}>{body}</p>
            <div style={{ fontSize: '1.1em', color: '#1f1d1d', display: 'flex', alignItems: 'center', gap: '7px', justifyContent: 'center', margin: '5px'}}>
                Likes: {likeCount} 
                <button style={{ borderRadius: '10px', backgroundColor: '#0066cc', fontSize: '1.1em', padding: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center'}} onClick={() => setLikeCount(prev => prev + 1)}>👍</button>
                <button style={{ borderRadius: '10px', backgroundColor: '#0066cc', fontSize: '1.1em', padding: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center'}} onClick={() => setLikeCount(prev => prev - 1)}>👎</button>
            </div>
            <small>Post ID: {postId} | Comment ID: {id}</small>
        </div>
    );
}

export default Komentarz;