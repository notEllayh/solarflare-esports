import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async'
import SolarFlareApp from './SolarFlareApp.tsx'
import './index.css' 

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element with id 'root' not found in index.html");
} 

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <SolarFlareApp />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);