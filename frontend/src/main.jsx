import { StrictMode } from 'react';  // StrictMode for highlighting potential problems
import { createRoot } from 'react-dom/client'; // createRoot for rendering the app
import './index.css';  // Global CSS styles
import App from './App.jsx'; // Main App component
import { BrowserRouter } from 'react-router';  // react-router for routing
import { Toaster } from 'react-hot-toast';  // react-hot-toast for notifications

// Rendering the React application into the root div
createRoot(document.getElementById('root')).render( 
  <StrictMode>  
    <BrowserRouter> 
      <App />
      <Toaster />
    </BrowserRouter>
  </StrictMode>
)
