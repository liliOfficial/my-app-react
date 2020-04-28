import React from 'react';
import Main from './components/home';
import './App.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <Main />
    </React.Fragment>
  );
}

export default App;
