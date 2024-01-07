import React from 'react';
import './ShowClients.css';
import ProfessionalCard from '../Components/Cards/ClientCard';
import { useClientContext } from '../ClientContext'; // Import the context

export default function ShowClientsPage() {
    const { clients } = useClientContext(); // Use the context to get client data

    if (!clients || clients.length === 0) {
    return (
      <div className="show-products-page">
        <h1>العملاء</h1>
        <p>لا يوجد عملاء لعرضها.</p>
      </div>
    );
  }

    return (
        <div className='show-products-page'>
            <h1 style={{ marginBottom: '30px' }}>العملاء</h1>
            <div className='CardsDiv'>
                {clients.map((client, index) => (
                    <ProfessionalCard key={index} client={client} /> // Pass client data as a prop
                ))}
            </div>
        </div>
    );
}
