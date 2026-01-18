import React from 'react';

interface PrzyciskProps {
    onClickHandler: () => void;
}

const Przycisk: React.FC<PrzyciskProps> = ({ onClickHandler }) => {
    return (
        <button onClick={onClickHandler}>Dodaj (komponent)</button>
    );
};

export default Przycisk;