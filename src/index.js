import React from 'react';
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Browse from './routes/Browse';
import SignIn from './routes/SignIn';
import FilmDetail from './routes/FilmDetail';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index />

          {/* Film browsing */}
          <Route path="browse" element={<Browse />} />
          <Route path="film/:id" element={<FilmDetail />} />

          {/* Authentication */}
          <Route path="signin" element={<SignIn />} />

          {/* Staff */}
          <Route path="staff/manage/films" />
          <Route path="staff/manage/actors" />
          <Route path="staff/manage/rentals" />
          <Route path="staff/manage/users" />

          {/* 404 */}
          <Route path="*" element={<div>404</div>} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
