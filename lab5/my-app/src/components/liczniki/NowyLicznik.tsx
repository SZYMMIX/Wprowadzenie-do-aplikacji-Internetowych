import React, { useState } from 'react';
import Przycisk from './Przycisk';

const NowyLicznik: React.FC = () => {
    const [licznik, setLicznik] = useState(0);

    const zwieksz = () => {
        setLicznik(licznik + 1);
    };

    return (
        <div>
            <div>Nowy Licznik: {licznik}</div>
            <Przycisk onClickHandler={zwieksz} />
        </div>
    );
};

export default NowyLicznik;