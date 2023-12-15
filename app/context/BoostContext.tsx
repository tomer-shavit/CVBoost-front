"use client";
import { BoostResponse, emptyBoostResponse } from "@/types/apiCalls";
import { BoostDataContextType } from "@/types/boostDataContext";
import React, { createContext, useState, useContext, useEffect } from "react";

const BoostDataContext = createContext<BoostDataContextType>({
  boostData: emptyBoostResponse,
  setBoostData: () => {},
});

export const BoostDataProvider = ({ children }) => {
  const [boostData, setBoostData] = useState<BoostResponse>(emptyBoostResponse);

  return (
    <BoostDataContext.Provider value={{ boostData, setBoostData }}>
      {children}
    </BoostDataContext.Provider>
  );
};

export const useBoostData = () => useContext(BoostDataContext);
