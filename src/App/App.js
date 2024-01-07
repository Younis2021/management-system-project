import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from '../Components/NavBar/NavBar';
import ShowProductsPage from '../ShowProducts/ShowProducts';
import AddProductPage from '../AddProduct/AddProduct';
import AddClientPage from '../AddClient/AddClient';
import ShowClientsPage from '../ShowClients/ShowClients';
import InvoicePage from '../Invoice/Invoice';
import WelcomePage from '../Welcome/Welcome';

export default function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<WelcomePage />} />
                    <Route path="/show_products" element={<ShowProductsPage />} />
                    <Route path="/add_product" element={<AddProductPage />} />
                    <Route path="/add_client" element={<AddClientPage />} />
                    <Route path="/show_clients" element={<ShowClientsPage />} />
                    <Route path="/invoice" element={<InvoicePage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
