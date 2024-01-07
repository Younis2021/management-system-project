import React, { useState } from 'react';
import './ClientCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; // Import the times icon
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal'; // Import the confirmation modal
import { useClientContext } from '../../ClientContext'; // Import the context

export default function ProfessionalCard({ client }) {
    const { removeClient } = useClientContext(); // Use the context to remove clients
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleRemove = () => {
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        // Call your removeClient function here
        removeClient(client);
        setIsModalOpen(false);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="professional-card">
            <div className="card-content">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h5 className="card-text">{client.phoneNumber}</h5>
                    <h5 className="card-text">{client.selectedType}</h5>
                </div>
                <h2 className="card-title">{client.clientName}</h2>
                <h5 className="card-text">{client.storeName}</h5>
                <h5 className="card-text">{client.address}</h5>
                <h5 className="card-text">{client.sellingPrice}</h5>
                <button className="remove-button" onClick={handleRemove}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </div>
            <ConfirmDeleteModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                onConfirm={confirmDelete}
            />
        </div>
    );
}
