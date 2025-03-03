import { createContext, useState, useContext, useEffect } from 'react';

const BalanceContext = createContext();

export const BalanceProvider = ({ children }) => {
  const initialBalance = parseInt(localStorage.getItem('playerBalance')) || 1000;
  const [balance, setBalance] = useState(initialBalance);

  useEffect(() => {
    console.log("Balance Stored:", balance);
    localStorage.setItem('playerBalance', balance);
  }, [balance]);
  
  return (
    <BalanceContext.Provider value={{ balance, setBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalance = () => useContext(BalanceContext);
