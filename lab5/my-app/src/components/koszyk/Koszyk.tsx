import React from 'react';
import Produkt from './Produkt';



const Koszyk: React.FC = () => {
    return (
        <div style={ {display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
            <h2>Koszyk</h2>
            <Produkt nazwa="Jabłko" />
            <Produkt nazwa="Gruszka" />
            <Produkt nazwa="Śliwka" />
            <Produkt nazwa="Banan" />
            <Produkt nazwa="Czereśnie" />
        </div>
    );
};

export default Koszyk;