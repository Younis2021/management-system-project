import React, { createContext, useContext, useState, useEffect } from 'react';

const ClientContext = createContext();

export function useClientContext() {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error('useClientContext must be used within a ClientProvider');
  }
  return context;
}

export function ClientProvider({ children }) {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Load clients from Local Storage when the component mounts
    const storedClients = localStorage.getItem('clients');
    if (storedClients) {
      setClients(JSON.parse(storedClients));
    }
  }, []);

  const addClient = (newClient) => {
    const updatedClients = [...clients, newClient];
    setClients(updatedClients);
    // Save clients to Local Storage whenever clients change
    localStorage.setItem('clients', JSON.stringify(updatedClients));
  };

  const removeClient = (clientToRemove) => {
    const updatedClients = clients.filter((client) => client !== clientToRemove);
    setClients(updatedClients);
    // Save updated clients to Local Storage when a client is removed
    localStorage.setItem('clients', JSON.stringify(updatedClients));
  };

  return (
    <ClientContext.Provider value={{ clients, addClient, removeClient }}>
      {children}
    </ClientContext.Provider>
  );
}
