import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export function useProductContext() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useClientContext must be used within a ProductProvider');
  }
  return context;
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Load products from local storage when the component mounts
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  const addProduct = (newProduct) => {
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    // Save clients to Local Storage whenever clients change
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

const removeProduct = (index) => {
  const updatedProducts = [...products];
  updatedProducts.splice(index, 1);
  setProducts(updatedProducts);

  // Update local storage to reflect the removed product
  localStorage.setItem('products', JSON.stringify(updatedProducts));
};


  return (
    <ProductContext.Provider value={{ products, addProduct, removeProduct }}>
      {children}
    </ProductContext.Provider>
  );
}
