import React, { useState, useEffect } from 'react';

const LicznikEfekt: React.FC = () => {
    const [licznik, setLicznik] = useState<number>(0);

    const dodaj = () => {
        setLicznik(licznik+1);
    }

    useEffect(() => {
        console.log("Hello world");
    }, []);

    useEffect(() => {
        console.log(`Licznik zwiększył się do ${licznik}`);
    }, [licznik]);

    return (
        <div style={ {display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
            <h1>Licznik Efekt:</h1>
            <p>{licznik}</p>
            <button onClick={dodaj}>Dodaj</button>
        </div>
    )
}


export default LicznikEfekt;