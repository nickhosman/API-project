import React, { useState, useContext } from "react";

const SpotContext = React.createContext();

export function SpotProvider({ children }) {
  const [spot, setSpot] = useState({});

  const contextValue = {
    spot,
    setSpot,
  };

  return (
    <SpotContext.Provider value={contextValue}>{children}</SpotContext.Provider>
  );
}

export const useSpotContext = () => useContext(SpotContext);
