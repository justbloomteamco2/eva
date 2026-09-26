import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'
import './styles.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  const fallback = document.createElement('main')
  fallback.style.cssText = 'min-height:100vh;display:flex;align-items:center;padding:8vw;background:#080808;color:#f5f3ee;font:14px Inter,sans-serif'
  fallback.setAttribute('role', 'alert')
  fallback.textContent = 'Bardapure Productions could not start because the page root is missing. Please refresh or contact hello@bardapure.com.'
  document.body.append(fallback)
  throw new Error('Required #root element was not found.')
}

createRoot(rootElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
