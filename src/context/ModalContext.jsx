import React, { createContext, useContext, useState, useCallback } from 'react';

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);

  const openGetStartedModal = useCallback(() => {
    setIsGetStartedOpen(true);
  }, []);

  const closeGetStartedModal = useCallback(() => {
    setIsGetStartedOpen(false);
  }, []);

  return (
    <ModalContext.Provider
      value={{
        isGetStartedOpen,
        openGetStartedModal,
        closeGetStartedModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}

