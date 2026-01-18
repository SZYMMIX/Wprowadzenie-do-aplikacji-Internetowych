import React, {useState} from "react";

interface Student {
    imie: string;
    nazwisko: string;
    rocznik: number;
}

const Dodawanie: React.FC<{ onAdd: (s: Student) => void }> = ({ onAdd }) => {
    const [imie, setImie] = useState("");
    const [nazwisko, setNazwisko] = useState("");
    const [rocznik, setRocznik] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!imie || !nazwisko || !rocznik) {
            alert("Wypełnij wszystkie pola");
            return;
        }
        
        const rocznikNum = parseInt(rocznik);
        if (isNaN(rocznikNum)) {
            alert("Rocznik musi być liczbą");
            return;
        }

        if (rocznikNum < 1900 || rocznikNum > 2026) {
            alert("Rocznik musi być sensowną liczbą");
            return;
        }

        onAdd({ imie, nazwisko, rocznik: rocznikNum });
        
        setImie("");
        setNazwisko("");
        setRocznik("");
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
            <input placeholder="Imię" value={imie} onChange={e => setImie(e.target.value)} />
            <input placeholder="Nazwisko" value={nazwisko} onChange={e => setNazwisko(e.target.value)} />
            <input placeholder="Rocznik" value={rocznik} onChange={e => setRocznik(e.target.value)} />
            <button type="submit">Dodaj</button>
        </form>
    );
}

const StudentManager: React.FC = () => {
    const [students, setStudents] = useState([
        { imie: "Jan", nazwisko: "Kowalski", rocznik: 1999 },
        { imie: "Anna", nazwisko: "Nowak", rocznik: 2000 },
        { imie: "Marek", nazwisko: "Zygmunt", rocznik: 1998 },
    ]);

    const handleAddStudent = (newStudent: Student) => {
        setStudents(prev => [...prev, newStudent]);
    };
    
    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <h3>Manager Studentów</h3>
            <table border={1}>
                <thead>
                    <tr><th>Imię</th><th>Nazwisko</th><th>Rocznik</th></tr>
                </thead>
                <tbody>
                    {students.map((s, idx) => (
                        <tr key={idx}><td>{s.imie}</td><td>{s.nazwisko}</td><td>{s.rocznik}</td></tr>
                    ))}
                </tbody>
            </table>
            
            <Dodawanie onAdd={handleAddStudent} />
        </div>
    );
}

export default StudentManager;