import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const root = document.getElementById('root');

window.addEventListener('wheel', (event) => {
  if (!event.ctrlKey) return;

  event.preventDefault();

  const currentScale = Number(document.body.dataset.zoom || '1');
  const nextScale = Math.min(1.6, Math.max(0.8, currentScale + (event.deltaY > 0 ? -0.08 : 0.08)));

  document.body.dataset.zoom = String(Number(nextScale.toFixed(2)));
  document.body.style.zoom = String(nextScale);
}, { passive: false });

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
