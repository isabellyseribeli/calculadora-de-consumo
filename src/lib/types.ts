export interface Appliance {
  id: string;
  name: string;
  power: number; // in Watts
  usageHoursPerDay: number;
}

export interface Room {
  id: string;
  name: string;
  appliances: Appliance[];
}

export type TariffFlag = "verde" | "amarela" | "vermelha1" | "vermelha2";
