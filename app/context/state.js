import { createContext, useContext, useState } from 'react';

const ReferralContext = createContext();

export function ReferralContextProvider({ children, isAdmin }) {
  const [isAdmin, setIsAdmin] = useState(false)
  setIsAdmin(isAdmin)
  return (
    <ReferralContext.Provider value={{ isAdmin }}>
      {children}
    </ReferralContext.Provider>
  );
}

export function useReferralContext() {
  return useContext(ReferralContext);
}