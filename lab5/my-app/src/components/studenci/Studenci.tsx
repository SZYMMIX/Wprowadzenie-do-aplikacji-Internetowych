import React from "react";

interface Student {
    imie: string;
    nazwisko: string;
    rocznik: number;
}

const Studenci: React.FC = () => {
    const Students: Student[] = [
        { imie: "Jan", nazwisko: "Kowalski", rocznik: 1999 },
        { imie: "Anna", nazwisko: "Nowak", rocznik: 2000 },
        { imie: "Marek", nazwisko: "Zygmunt", rocznik: 1998 },
    ];
    
    return (
        <table border={1}>
            <thead>
                <tr>
                    <th>Imię</th><th>Nazwisko</th><th>Rocznik</th>
                </tr>
            </thead>
            <tbody>
                {Students.map((student, idx) => (
                    <tr key={idx}>
                        <td>{student.imie}</td>
                        <td>{student.nazwisko}</td>
                        <td>{student.rocznik}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Studenci;