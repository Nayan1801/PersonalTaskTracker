import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import React from 'react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/*  Needed for <Routes> to work */}
      <App />
    </BrowserRouter>
  </StrictMode>,
)