import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormComponent from './FormComponent';
import ViewData from './ViewData';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <h1> Form Validation</h1>
        <Routes>
          <Route exact path="/" element={<FormComponent />} />
          <Route path="/view-data" element={<ViewData />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
