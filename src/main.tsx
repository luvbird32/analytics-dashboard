
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Debug logging for external preview
console.log('🚀 Analytics Dashboard starting...', {
  timestamp: new Date().toISOString(),
  environment: import.meta.env.MODE,
  location: window.location.href
});

createRoot(document.getElementById("root")!).render(<App />);
