import ReactDom from 'react-dom/client';
import React from 'react';
import App from './App';

function renderPage() {
  const rootNode = ReactDom.createRoot(document.getElementById('root'));
  rootNode.render(<App />);
}

renderPage();
