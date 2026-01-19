import React, { useState } from 'react';
import Przycisk from './Przycisk';

const NowyLicznik: React.FC = () => {
    const [licznik, setLicznik] = useState(0);

    const zwieksz = () => {
        setLicznik(licznik + 1);
    };

    return (
        <div style={ {margin: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
            <div style={ {fontWeight:'bold', fontSize: '1.5em'}}>Nowy Licznik: {licznik}</div>
            <Przycisk onClickHandler={zwieksz} />
        </div>
    );
};

export default NowyLicznik;