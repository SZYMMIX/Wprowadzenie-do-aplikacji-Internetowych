import React from 'react';
import Produkt from './Produkt';



const NowyKoszyk: React.FC = () => {
    const produkty = ["Mleko", "Chleb", "Masło", "Ser", "Wędlina"];

    return (
        <div>
            <h2>Nowy Koszyk</h2>
            {produkty.map((name, index) => (
                <Produkt key={index} nazwa={name}/>
            ))}
        </div>
    );
};

export default NowyKoszyk;