
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log("🌊 AquaFlow: Initializing System...");

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("❌ Critical Error: Root element '#root' not found in index.html");
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("✅ AquaFlow: Mounted successfully.");
  } catch (err) {
    console.error("❌ AquaFlow: Rendering failed", err);
  }
}
