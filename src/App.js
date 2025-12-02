
import './App.css';
import Posts from './Posts.js';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import ContactsPage from "./pages/ContactsPage";
import RandomPost from "./pages/RandomPost";
import SearchPost from "./pages/SearchPosts";


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
              <a href="/random">Случайная статья</a>
              <a href="/search">Поиск статей</a>
            </nav>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/random" element={<RandomPost />} />
          <Route path="/search" element={<SearchPost />} />
        </Routes>
      </Router> 

      

      <footer className="footer">
        <p>© 2025 LinguaPro — учебный блог для изучения языков</p>
      </footer>
    </>
  );
}



export default App;
