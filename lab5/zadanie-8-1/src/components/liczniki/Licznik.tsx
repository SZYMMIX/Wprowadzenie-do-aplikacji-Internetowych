import { useState, useEffect } from 'react';

function Licznik() {
  const [licznik, setLicznik] = useState<number>(() => {
    const savedValue = localStorage.getItem('stanLicznika');
    if (savedValue) {
      return parseInt(savedValue, 10);
    }
    return 0;
  });

  useEffect(() => {
    localStorage.setItem('stanLicznika', licznik.toString());
  }, [licznik]);

  const dodaj = () => {
    setLicznik(prev => prev + 1);
  };

  const resetuj = () => {
    setLicznik(0);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <div style={{ fontSize: '2em', margin: '20px' }}>
        Licznik: {licznik}
      </div>
      
      <button onClick={dodaj} style={{ padding: '10px 20px', fontSize: '1.2em', marginRight: '10px' }}>
        Dodaj
      </button>
      
      <button onClick={resetuj} style={{ padding: '10px 20px', fontSize: '1.2em' }}>
        Resetuj
      </button>

      <p style={{ marginTop: '20px', color: 'gray' }}>
        Odśwież stronę - licznik nie powinien się wyzerować.
      </p>
    </div>
  );
}

export default Licznik;