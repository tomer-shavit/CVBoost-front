"use client";
import { GptApiResponse, emptyGptApiResponse } from "@/types/apiCalls";
import { BoostDataContextType } from "@/types/boostDataContext";
import React, { createContext, useState, useContext } from "react";

const BoostDataContext = createContext<BoostDataContextType>({
  boostData: emptyGptApiResponse,
  setBoostData: () => {},
});

export const BoostDataProvider = ({ children }) => {
  const [boostData, setBoostData] =
    useState<GptApiResponse>(emptyGptApiResponse);

  return (
    <BoostDataContext.Provider value={{ boostData, setBoostData }}>
      {children}
    </BoostDataContext.Provider>
  );
};

export const useBoostData = () => useContext(BoostDataContext);
