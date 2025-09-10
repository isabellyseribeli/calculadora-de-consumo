"use client";

import { EnergyContext } from "@/contexts/energy-provider";
import { useContext } from "react";

export const useEnergy = () => {
  const context = useContext(EnergyContext);
  if (!context) {
    throw new Error("useEnergy must be used within an EnergyProvider");
  }
  return context;
};
