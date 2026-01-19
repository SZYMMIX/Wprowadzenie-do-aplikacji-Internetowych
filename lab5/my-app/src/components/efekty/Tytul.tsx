import React, { useState, useEffect } from 'react';

const Tytul: React.FC = () => {
    const [tytul, setTytul] = useState("");

    useEffect(() => {
        document.title = tytul;
    }, [tytul]); 

    return (
        <div style={ {display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
            <p>Wpisz tytuł strony:</p>
            <input value={tytul} onChange={e => setTytul(e.target.value)} />
        </div>
    );
};

export default Tytul;