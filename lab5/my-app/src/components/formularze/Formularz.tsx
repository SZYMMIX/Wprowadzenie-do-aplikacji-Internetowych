import React, {useState} from "react";



const Formularz: React.FC = () => {
    const [tekst, setTekst] = useState("");

    return (
        <>
        <input value={tekst} type="text" onChange={(e) => setTekst(e.target.value)}/>
        <div>{tekst}</div>
        </>
    )
}

export default Formularz;