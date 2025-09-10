import { Room, TariffFlag } from "./types";
import { generateId } from "./utils";

export const TARIFF_RATES: Record<TariffFlag, { rate: number; label: string }> = {
  verde: { rate: 0.54, label: "Bandeira Verde" },
  amarela: { rate: 0.57, label: "Bandeira Amarela" },
  vermelha1: { rate: 0.60, label: "Bandeira Vermelha P1" },
  vermelha2: { rate: 0.65, label: "Bandeira Vermelha P2" },
};

export const INITIAL_ROOMS: Room[] = [
    {
        id: "suite",
        name: "Suíte",
        appliances: [],
      },
      {
        id: "banheiro_suite",
        name: "Banheiro Suíte",
        appliances: [],
      },
      {
        id: "quarto_2",
        name: "Quarto 2",
        appliances: [],
      },
      {
        id: "cozinha",
        name: "Cozinha",
        appliances: [],
      },
      {
        id: "banheiro_1",
        name: "Banheiro",
        appliances: [],
      },
      {
        id: "quarto_3",
        name: "Quarto 3",
        appliances: [],
      },
      {
        id: "sala",
        name: "Sala",
        appliances: [],
      },
      {
        id: "lavanderia",
        name: "Lavanderia",
        appliances: [],
      },
      {
        id: "escritorio",
        name: "Escritório",
        appliances: [],
      },
      { id: "garagem", name: "Garagem", appliances: [] },
      { id: "corredor", name: "Corredor", appliances: [] },
];
