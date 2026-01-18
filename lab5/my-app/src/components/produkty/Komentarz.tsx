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
        <div style={{ border: '1px solid #ccc', padding: '30px', marginBottom: '10px', borderRadius: '5px', backgroundColor: '#00000083' }}>
            <div style={{ fontWeight: 'bold', fontSize: '1.2em'}}>{user.fullName} (@{user.username})</div>
            <p style={{ fontSize: '1.2em'}}>{body}</p>
            <div style={{ fontSize: '1em', color: 'gray', display: 'flex', alignItems: 'center', gap: '5px', justifyContent: 'center', margin: '5px'}}>
                Likes: {likeCount} 
                <button onClick={() => setLikeCount(prev => prev + 1)}>👍</button>
                <button onClick={() => setLikeCount(prev => prev - 1)}>👎</button>
            </div>
            <small>Post ID: {postId} | Comment ID: {id}</small>
        </div>
    );
}

export default Komentarz;