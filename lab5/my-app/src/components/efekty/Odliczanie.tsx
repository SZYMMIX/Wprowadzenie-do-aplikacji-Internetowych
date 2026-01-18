import React, { useState, useEffect } from 'react';

const Odliczanie: React.FC = () => {
    const [counter, setLicznik] = useState(15.0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval: number;

        if (isActive && counter > 0) {
            interval = setInterval(() => {
                setLicznik(prev => {
                    if (prev <= 0.1) {
                        setIsActive(false);
                        return 0;
                    }
                    return prev - 0.1;
                });
            }, 100);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, counter]);

    const toggleStart = () => {
        setIsActive(!isActive);
    };

    const finished = counter <= 0;

    return (
        <div>
            <h2>Odliczanie: {counter.toFixed(1)} sek</h2>
            <button 
                onClick={toggleStart} 
                disabled={finished}
            >
                {finished ? "Odliczanie zakończone" : (isActive ? "STOP" : "START")}
            </button>
        </div>
    );
};

export default Odliczanie;