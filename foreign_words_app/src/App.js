import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import wordStore from './stores/WordStore';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainPage from './components/MainPage/MainPage';
import CardPage from './components/CardPage/CardPage';
import FeedbackPage from './components/FeedbackPage/FeedbackPage';
import Error404Page from './components/Error404Page/Error404Page';
import './assets/styles/style.css';

function App() {
  return (
    <Provider wordStore={wordStore}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <div className="Content">
            <Routes>
              <Route exact path="project_foreignWords_app/" element={<MainPage />} />
              <Route path="project_foreignWords_app/game" element={<CardPage />} />
              <Route path="project_foreignWords_app/feedback" element={<FeedbackPage />} />
              <Route path="*" element={<Error404Page />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;