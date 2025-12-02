
import './App.css';
import Posts from './Posts.js';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import ContactsPage from "./pages/ContactsPage";


function App() {
  return (
    <>
      <Router>
        <header className="header">
          <div className="header-content">
            <h2>🌎 LinguaPro</h2>
            <nav>
              <a href="/">Блог</a>
              <a href="/about">О школе</a>
              <a href="/contacts">Контакты</a>
            </nav>
          </div>
        </header>
        <Routes>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
        </Routes>
      </Router> 

      <main className="App">
        <Posts />
      </main>

      <footer className="footer">
        <p>© 2025 LinguaPro — учебный блог для изучения языков</p>
      </footer>
    </>
  );
}



export default App;
