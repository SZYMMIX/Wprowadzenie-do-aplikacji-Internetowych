import React from "react";


const Ternary: React.FC = () => {
    const a = false;
    const b = false;


    return (
        <>
        <div>
            {a ? <h1>Stwierdzenie a jest prawdziwe</h1> : <h1>Stwierdzenie a jest fałszywe</h1>}
        </div>

        <div>
            {b ? <h1>Stwierdzenie b jest prawdziwe</h1> : <h1>Stwierdzenie b jest fałszywe</h1>}
        </div>
        </>
    )
}

export default Ternary;