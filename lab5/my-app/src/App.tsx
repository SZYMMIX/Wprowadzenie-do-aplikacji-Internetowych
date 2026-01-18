import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Importy naszych zadań do testów (można je wyświetlić np. na stronie głównej lub osobnych podstronach)
import Koszyk from './components/koszyk/Koszyk';
import NowyKoszyk from './components/koszyk/NowyKoszyk';
import Licznik from './components/liczniki/Licznik';
import NowyLicznik from './components/liczniki/NowyLicznik';
import Formularz from './components/formularze/Formularz';
import Haslo from './components/formularze/Haslo';
import Logowanie from './components/formularze/Logowanie';
import Ternary from './components/inne/Ternary';
import Aktualizacja from './components/inne/Aktualizacja';
import Studenci from './components/studenci/Studenci';
import StudentManager from './components/studenci/StudentManager';
import LicznikEfekt from './components/efekty/LicznikEfekt';
import Tytul from './components/efekty/Tytul';
import Odliczanie from './components/efekty/Odliczanie';
import Komentarze from './components/produkty/Komentarze';

import ArticleList from './components/blog/ArticleList';
import ArticleDetails from './components/blog/ArticleDetails';
import AddArticle from './components/blog/AddArticle';

const Home: React.FC = () => (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100vw'}}>
        <h1>Witaj na blogu!</h1>
        <nav style={{ marginBottom: 20, borderBottom: '1px solid #ccc', paddingBottom: 10 }}>
            <Link to="/blog" style={{ marginRight: 10 }}>Blog</Link>
            <Link to="/dodaj">Dodaj Artykuł</Link>
        </nav>
        <h2>Sekcja Ćwiczeń (Zadania 1-7)</h2>
        
        <details><summary>Zadanie 1 (Koszyki)</summary>
            <Koszyk />
            <NowyKoszyk />
        </details>

        <details><summary>Zadanie 2 (Liczniki)</summary>
            <Licznik />
            <NowyLicznik />
        </details>

        <details><summary>Zadanie 3 (Formularze)</summary>
            <Formularz />
            <Haslo />
            <Logowanie />
        </details>

        <details><summary>Zadanie 4 (Inne)</summary>
            <Ternary />
            <Aktualizacja />
        </details>

        <details><summary>Zadanie 5 (Studenci)</summary>
            <Studenci />
            <StudentManager />
        </details>

        <details><summary>Zadanie 6 (Efekty)</summary>
            <LicznikEfekt />
            <Tytul />
            <Odliczanie />
        </details>

        <details><summary>Zadanie 7 (API)</summary>
            <Komentarze />
        </details>
    </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={
            <div style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100vw'}}>
                <Link to="/">Powrót</Link>
                <ArticleList />
            </div>
        } />
        <Route path="/article/:id" element={
            <div style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100vw'}}>
                <Link to="/blog">Powrót do bloga</Link>
                <ArticleDetails />
            </div>
        } />
        <Route path="/dodaj" element={
            <div style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100vw'}}>
                <Link to="/">Powrót</Link>
                <AddArticle />
            </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;