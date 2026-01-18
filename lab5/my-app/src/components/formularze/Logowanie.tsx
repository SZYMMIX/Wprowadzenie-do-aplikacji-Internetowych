import React, {useState} from "react";

const Logowanie: React.FC = () => {
    const [nazwa, setNazwa] = useState("");
    const [haslo1, setHaslo1] = useState("");
    const [haslo2, setHaslo2] = useState("");
    const disabled = !nazwa || !haslo1 || !haslo2;

    const handleLogin = () => {
        if (haslo1 !== haslo2) {
            alert("Hasła nie są zgodne");
        } else {
            alert("Zalogowano poprawnie");
        }
    };

    return(
        <>
            <h3>Logowanie</h3>
            <input placeholder="Nazwa użytkownika" value={nazwa} onChange={e => setNazwa(e.target.value)} /><br/>
            <input placeholder="Hasło" type="password" value={haslo1} onChange={e => setHaslo1(e.target.value)} /><br/>
            <input placeholder="Powtórz hasło" type="password" value={haslo2} onChange={e => setHaslo2(e.target.value)} /><br/>
            <button disabled={disabled}  onClick={() => handleLogin()}>Logowanie</button>
        </>
    )
}

export default Logowanie;