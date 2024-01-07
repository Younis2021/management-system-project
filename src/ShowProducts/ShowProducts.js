import React from 'react';
import './ShowProducts.css';
import { useProductContext } from '../ProductContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function ShowProductsPage() {
  const { products, removeProduct } = useProductContext();

  if (!products || products.length === 0) {
    return (
      <div className="show-products-page">
        <h1>المنتجات</h1>
        <p>لا يوجد منتجات لعرضها.</p>
      </div>
    );
  }

  return (
    <div className="show-products-page">
      <h1>المنتجات</h1>
      <table className="product-table">
        <thead>
          <tr>
            <th>اسم المنتج</th>
            <th>اسم الشركة</th>
            <th>كمية المنتج</th>
            <th>نوع المنتج</th>
            <th>سعر البيع</th>
            <th>سعر الشراء</th>
            <th>أقصى كمية متاحة</th>
            <th>صورة المنتج</th>
            <th>إزالة</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.productName}</td>
              <td>{product.productCompany}</td>
              <td>{product.productQuantity}</td>
              <td>{product.productType}</td>
              <td>{product.sellingPrice}</td>
              <td>{product.buyingPrice}</td>
              <td>{product.maxQuantity}</td>
              <td>
                {product.selectedImage && (
                  <img
                    src={product.selectedImage}
                    alt="صورة المنتج"
                    style={{ width: '100px', height: '100px' }}
                  />
                )}
              </td>
              <td>
                <button className='removeBtn' onClick={() => removeProduct(index)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
