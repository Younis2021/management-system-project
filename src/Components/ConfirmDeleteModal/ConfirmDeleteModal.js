import React from 'react';
import './ConfirmDeleteModal.css'; // Create a CSS file for styling the modal

export default function ConfirmDeleteModal({ isOpen, onRequestClose, onConfirm }) {
  return (
    <div className={`confirm-delete-modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <h3>تأكيد الحذف</h3>
        <div className="modal-buttons">
          <button onClick={onConfirm}>حذف</button>
          <button onClick={onRequestClose}>الغاء</button>
        </div>
      </div>
    </div>
  );
}
