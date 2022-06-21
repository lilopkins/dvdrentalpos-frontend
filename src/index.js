import React from 'react';
import { HashRouter as Router, Link, Route, Routes } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Browse from './routes/Browse';
import SignIn from './routes/SignIn';
import FilmDetail from './routes/FilmDetail';
import Index from './routes/Index';
import ActorDetail from './routes/ActorDetail';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Index />} />

          {/* Film browsing */}
          <Route path="browse" element={<Browse />} />
          <Route path="film/:id" element={<FilmDetail />} />

          {/* Actor browsing */}
          <Route path="actor/:id" element={<ActorDetail />} />

          {/* Authentication */}
          <Route path="signin" element={<SignIn />} />

          {/* Staff */}
          <Route path="staff/manage/films" />
          <Route path="staff/manage/actors" />
          <Route path="staff/manage/rentals" />
          <Route path="staff/manage/users" />

          {/* 404 */}
          <Route path="*" element={<><h1>404 Not Found</h1><Link to="/">Head home?</Link></>} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
