import React, { useState } from 'react';

const Licznik: React.FC = () => {
    const [licznik, setLicznik] = useState<number>(0);

    const dodaj = () => {
        setLicznik(licznik+1);
    }

    return (
        <div style={ {display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
            <h1>Licznik</h1>
            <p>{licznik}</p>
            <button onClick={dodaj}>Dodaj</button>
        </div>
    )
}


export default Licznik;