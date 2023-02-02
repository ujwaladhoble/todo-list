import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Todo from './Todo';
import Todos from './Todo';
import Testtodo from './Todo';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Todo />
  </React.StrictMode>
);

