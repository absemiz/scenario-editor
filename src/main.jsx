import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ApplicationStateProvider } from './ApplicationContext.jsx'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApplicationStateProvider>
      <App />
    </ApplicationStateProvider>
  </React.StrictMode>,
)
