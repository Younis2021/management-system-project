import React, { useState, useEffect } from 'react';
import './AddClient.css';
import { useClientContext } from '../ClientContext';

const inputFields = [
  { label: 'اسم العميل', state: 'clientName', type: 'text', placeholder: 'أدخل اسم العميل' },
  { label: 'رقم التليفون', state: 'phoneNumber', type: 'text', placeholder: 'أدخل رقم التليفون' },
  { label: 'اسم المحل', state: 'storeName', type: 'text', placeholder: 'أدخل اسم المحل' },
  { label: 'العنوان', state: 'address', type: 'text', placeholder: 'أدخل عنوان العميل' },
  { label: 'اسم المنطقة', state: 'sellingPrice', type: 'text', placeholder: 'أدخل اسم المنطقة' },
];

const salesOptions = ['جمله', 'قطاعي'];

export default function AddClientPage() {
  const [formData, setFormData] = useState({});
  const [selectedType, setSelectedType] = useState('جمله');
  const { addClient, clients } = useClientContext();

  const handleInputChange = (event, field) => {
    const { value } = event.target;
    setFormData((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleAddClient = () => {
    const newClient = {
      ...formData,
      selectedType,
    };

    addClient(newClient);
    setFormData({});
    setSelectedType('جمله');
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  useEffect(() => {
    // Populate fields when a client is selected from local storage
    const selectedClientName = formData.clientName;
    if (selectedClientName) {
      const selectedClient = clients.find((client) => client.clientName === selectedClientName);
      if (selectedClient) {
        setFormData(selectedClient);
        setSelectedType(selectedClient.selectedType);
      }
    }
  }, [formData.clientName, clients]);

  return (
    <div className="add-client-page">
      <h1>إضافة عميل</h1>
      {inputFields.map((field, index) => (
        <div className="input-group" id="client-group" key={index}>
          <label>{field.label}</label>
          <input
            type={field.type}
            placeholder={field.placeholder}
            value={formData[field.state] || ''}
            onChange={(e) => handleInputChange(e, field.state)}
          />
        </div>
      ))}
      <div className="select-container">
        <label htmlFor="salesType">نوع البيع:</label>
        <select
          id="salesType"
          value={selectedType}
          onChange={handleTypeChange}
        >
          {salesOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <div className="button-group" id="button-group">
          <button className="add-button" onClick={handleAddClient}>
            إضافة
          </button>
          <button className="cancel-button">إلغاء</button>
        </div>
      </div>
    </div>
  );
}
