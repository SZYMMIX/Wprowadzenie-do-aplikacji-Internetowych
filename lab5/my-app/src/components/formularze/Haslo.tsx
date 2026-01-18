import React, {useState} from "react";

const Haslo: React.FC = () => {
    const [haslo1, setHaslo1] = useState("");
    const [haslo2, setHaslo2] = useState("");

    const getMessage = () => {
        if (!haslo1 && !haslo2) {
            return "Proszę wprowadzić hasło";
        }
        if (haslo1 !== haslo2) {
            return "Hasła nie są zgodne";
        }
        return "";
    };

    return(
        <>
            <label>Hasło: <input value={haslo1} type="text" onChange={(e) => setHaslo1(e.target.value)}/> </label>
            <br/>
            <label>Powtórz hasło: <input value={haslo2} type="text" onChange={(e) => setHaslo2(e.target.value)}/> </label>
            <div style={{ color: 'red' }}>
                {getMessage()}
            </div>
        </>
    )
}

export default Haslo;