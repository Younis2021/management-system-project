import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App/App';
import { ClientProvider } from './ClientContext';
import { ProductProvider } from './ProductContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClientProvider> {/* Use the ClientProvider for managing client data */}
      <ProductProvider> {/* Use the ProductProvider for managing product data */}
        <App />
      </ProductProvider>
    </ClientProvider>
  </React.StrictMode>
);
