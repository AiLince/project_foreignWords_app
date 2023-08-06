import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainPage from './components/MainPage/MainPage';
import CardPage from './components/CardPage/CardPage';
import Error404Page from './components/Error404Page/Error404Page';
import './assets/styles/style.css';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="Content">
            <Routes>
                <Route exact path="project_foreignWords_app/" element={<MainPage />} />
                <Route path="project_foreignWords_app/game" element={<CardPage />} />
                <Route path="*" element={<Error404Page />} />
            </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;