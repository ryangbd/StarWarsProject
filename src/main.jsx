import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Pega o <div id="root"> do index.html
// e renderiza o componente App dentro dele
ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)