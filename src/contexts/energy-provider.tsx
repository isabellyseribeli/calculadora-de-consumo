"use client";

import { TARIFF_RATES, INITIAL_ROOMS } from "@/lib/constants";
import type { Appliance, Room, TariffFlag } from "@/lib/types";
import { generateId } from "@/lib/utils";
import React, {
  createContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";

interface EnergyContextType {
  rooms: Room[];
  tariffFlag: TariffFlag;
  setTariffFlag: (flag: TariffFlag) => void;
  addAppliance: (roomId: string, appliance: Omit<Appliance, "id">) => void;
  updateAppliance: (roomId: string, appliance: Appliance) => void;
  removeAppliance: (roomId: string, applianceId: string) => void;
  getRoomById: (roomId: string) => Room | undefined;
  totalMonthlyKwh: number;
  totalDailyKwh: number;
  totalMonthlyCost: number;
  totalDailyCost: number;
  getApplianceConsumption: (appliance: Appliance) => { monthlyKwh: number };
}

export const EnergyContext = createContext<EnergyContextType | null>(null);

export const EnergyProvider = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false);
  const [rooms, setRooms] = useState<Room[]>(INITIAL_ROOMS);
  
  const [tariffFlag, setTariffFlag] = useState<TariffFlag>("verde");

  useEffect(() => {
    setIsClient(true);
    const savedRooms = localStorage.getItem("energywise-rooms");
    if (savedRooms) {
      setRooms(JSON.parse(savedRooms));
    }
    const savedTariff = localStorage.getItem("energywise-tariff");
    if (savedTariff) {
      setTariffFlag(savedTariff as TariffFlag);
    }
  }, []);

  useEffect(() => {
    if(isClient) {
      localStorage.setItem("energywise-rooms", JSON.stringify(rooms));
    }
  }, [rooms, isClient]);

  useEffect(() => {
    if(isClient) {
      localStorage.setItem("energywise-tariff", tariffFlag);
    }
  }, [tariffFlag, isClient]);


  const addAppliance = useCallback(
    (roomId: string, applianceData: Omit<Appliance, "id">) => {
      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.id === roomId
            ? {
                ...room,
                appliances: [
                  ...room.appliances,
                  { ...applianceData, id: generateId() },
                ],
              }
            : room
        )
      );
    },
    []
  );

  const updateAppliance = useCallback(
    (roomId: string, updatedAppliance: Appliance) => {
      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.id === roomId
            ? {
                ...room,
                appliances: room.appliances.map((app) =>
                  app.id === updatedAppliance.id ? updatedAppliance : app
                ),
              }
            : room
        )
      );
    },
    []
  );

  const removeAppliance = useCallback((roomId: string, applianceId: string) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === roomId
          ? {
              ...room,
              appliances: room.appliances.filter(
                (app) => app.id !== applianceId
              ),
            }
          : room
      )
    );
  }, []);

  const getRoomById = useCallback(
    (roomId: string) => rooms.find((room) => room.id === roomId),
    [rooms]
  );
  
  const getApplianceConsumption = useCallback((appliance: Appliance) => {
    const monthlyKwh = (appliance.power * appliance.usageHoursPerDay * 30) / 1000;
    return { monthlyKwh };
  }, []);

  const {
    totalMonthlyKwh,
    totalDailyKwh,
    totalMonthlyCost,
    totalDailyCost,
  } = useMemo(() => {
    const totalPowerHours = rooms.reduce((total, room) => {
      return (
        total +
        room.appliances.reduce((roomTotal, appliance) => {
          return roomTotal + appliance.power * appliance.usageHoursPerDay;
        }, 0)
      );
    }, 0);

    const dailyKwh = totalPowerHours / 1000;
    const monthlyKwh = dailyKwh * 30;
    const tariffRate = TARIFF_RATES[tariffFlag].rate;
    const dailyCost = dailyKwh * tariffRate;
    const monthlyCost = monthlyKwh * tariffRate;

    return {
      totalMonthlyKwh: monthlyKwh,
      totalDailyKwh: dailyKwh,
      totalMonthlyCost: monthlyCost,
      totalDailyCost: dailyCost,
    };
  }, [rooms, tariffFlag]);

  const value = {
    rooms,
    tariffFlag,
    setTariffFlag,
    addAppliance,
    updateAppliance,
    removeAppliance,
    getRoomById,
    totalMonthlyKwh,
    totalDailyKwh,
    totalMonthlyCost,
    totalDailyCost,
    getApplianceConsumption,
  };

  return (
    <EnergyContext.Provider value={value}>{children}</EnergyContext.Provider>
  );
};
