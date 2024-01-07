import React, { useState } from 'react';
import './Invoice.css'; // Import the CSS file
import { useClientContext } from '../ClientContext';
import { useProductContext } from '../ProductContext';

export default function InvoicePage() {
  const { clients } = useClientContext();
  const { products } = useProductContext();
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [invoiceDetails, setInvoiceDetails] = useState({
    quantity: '',
  });
  const [invoiceTotal, setInvoiceTotal] = useState(0);
  const [invoiceDate, setInvoiceDate] = useState(getFormattedDate()); // Dynamic invoice date
  const [invoiceNumber, setInvoiceNumber] = useState(generateInvoiceNumber()); // Dynamic invoice number
  const [maxQuantity, setMaxQuantity] = useState(0); // Maximum quantity for the selected product

  // Helper function to get the current date in the desired format
  function getFormattedDate() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // Helper function to generate a random invoice number
  function generateInvoiceNumber() {
    return Math.floor(Math.random() * 100000).toString();
  }

  const handleClientChange = (event) => {
    const selectedClientName = event.target.value;
    const client = clients.find((client) => client.clientName === selectedClientName);
    setSelectedClient(client);
  };

  const handleProductChange = (event) => {
    const selectedProductName = event.target.value;
    const product = products.find((product) => product.productName === selectedProductName);
    setSelectedProduct(product);
    // Set the maximum quantity for the selected product
    setMaxQuantity(product ? product.maxQuantity : 0);
  };

  const handleInputChange = (event, field) => {
    const { value } = event.target;
    // Check if the entered quantity exceeds the maximum
    if (parseFloat(value) > maxQuantity) {
      alert('الكمية تتجاوز الحد الأقصى.');
      return;
    }
    setInvoiceDetails((prevDetails) => ({ ...prevDetails, [field]: value }));
  };

  const calculateInvoiceTotal = () => {
    const quantity = parseFloat(invoiceDetails.quantity);

    if (!isNaN(quantity) && selectedProduct) {
      const total = quantity * selectedProduct.sellingPrice;
      setInvoiceTotal(total.toFixed(2));
    } else {
      setInvoiceTotal(0);
    }
  };

  const generateInvoice = () => {
    if (!selectedClient || !selectedProduct) {
      alert('من فضلك اختر العميل والمنتج.');
      return;
    }

    const { clientName, address, phoneNumber } = selectedClient;
    const { productName, sellingPrice } = selectedProduct;
    const { quantity } = invoiceDetails;

    if (!quantity) {
      alert('من فضلك اختر الكمية.');
      return;
    }

    const total = (parseFloat(quantity) * sellingPrice).toFixed(2);

    const invoice = `
    تاريخ الفاتورة : ${invoiceDate} 
    رقم الفاتورة : ${invoiceNumber} 
    عميل : ${clientName}
    عنوان: ${address}
    رقم التليفون : ${phoneNumber}
    المنتج : ${productName}
    الكمية : ${quantity}
    السعر : $${sellingPrice}
    الاجمالي : $${total}
    `;

    alert(invoice);
  };

  return (
    <div className="invoice-page">
      <div className="invoice-container">
        <div className="UpperDiv">
          <div>
            <h1 className="invoice-title">فاتورة</h1>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <div className="date-info">
                <h5>التاريخ</h5>
                <p>{invoiceDate}</p>
              </div>
              <div className="invoice-number-info">
                <h5>رقم الفاتورة</h5>
                <p>{invoiceNumber}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="customer-info">
          <select className="customer-input" onChange={handleClientChange}>
            <option value="">اختر عميل</option>
            {clients.map((client) => (
              <option key={client.clientName} value={client.clientName}>
                {client.clientName}
              </option>
            ))}
          </select>

          {selectedClient && (
            <div className="customer-details">
              <h2>معلومات العميل</h2>
              <p>الاسم : {selectedClient.clientName}</p>
              <p>العنوان : {selectedClient.address}</p>
              <p>رقم التليفون : {selectedClient.phoneNumber}</p>
            </div>
          )}
        </div>

        <div className="invoice-details">
          <select className="product-input" onChange={handleProductChange}>
            <option value="">اختر منتج</option>
            {products.map((product) => (
              <option key={product.productName} value={product.productName}>
                {product.productName}
              </option>
            ))}
          </select>

          {selectedProduct && (
            <div className="product-details">
              <h2>معلومات المنتج</h2>
              <p>الاسم : {selectedProduct.productName}</p>
              <p>السعر : ${selectedProduct.sellingPrice}</p>
              <p>الحد الأقصى للكمية: {selectedProduct.maxQuantity}</p>
            </div>
          )}

          <div className="quantity-info" style={{ width: "30%" }}>
            <input
              type="number"
              className="quantity-input"
              id="quantity"
              placeholder="كمية المنتج"
              value={invoiceDetails.quantity}
              onChange={(e) => handleInputChange(e, 'quantity')}
            />
          </div>

          <button className="calculate-button" onClick={calculateInvoiceTotal}>
            احسب الاجمالي
          </button>

          <div className="invoice-total">
            <p className="total-label">Total: $<span className="total-amount">{invoiceTotal}</span></p>
          </div>
        </div>

        <button className="generate-button" onClick={generateInvoice}>
          طباعة فاتورة
        </button>
      </div>
    </div>
  );
}
