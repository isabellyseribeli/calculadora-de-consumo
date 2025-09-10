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
        appliances: [
          { id: generateId(), name: "Televisão", power: 120, usageHoursPerDay: 4 },
          { id: generateId(), name: "Ar Condicionado", power: 1000, usageHoursPerDay: 8 },
          { id: generateId(), name: "Lâmpada", power: 15, usageHoursPerDay: 6 },
        ],
      },
      {
        id: "banheiro_suite",
        name: "Banheiro Suíte",
        appliances: [
          { id: generateId(), name: "Chuveiro", power: 5500, usageHoursPerDay: 0.5 },
          { id: generateId(), name: "Lâmpada", power: 10, usageHoursPerDay: 1 },
        ],
      },
      {
        id: "quarto_2",
        name: "Quarto 2",
        appliances: [
          { id: generateId(), name: "Televisão", power: 100, usageHoursPerDay: 3 },
          { id: generateId(), name: "Ar Condicionado", power: 750, usageHoursPerDay: 8 },
          { id: generateId(), name: "Lâmpada", power: 12, usageHoursPerDay: 5 },
        ],
      },
      {
        id: "cozinha",
        name: "Cozinha",
        appliances: [
          { id: generateId(), name: "Geladeira", power: 150, usageHoursPerDay: 24 },
          { id: generateId(), name: "Fogão", power: 50, usageHoursPerDay: 1 },
          { id: generateId(), name: "Micro-ondas", power: 1200, usageHoursPerDay: 0.2 },
          { id: generateId(), name: "Televisão", power: 80, usageHoursPerDay: 2 },
          { id: generateId(), name: "Lâmpada", power: 20, usageHoursPerDay: 8 },
        ],
      },
      {
        id: "banheiro_1",
        name: "Banheiro",
        appliances: [
          { id: generateId(), name: "Chuveiro", power: 5500, usageHoursPerDay: 0.5 },
          { id: generateId(), name: "Lâmpada", power: 10, usageHoursPerDay: 1 },
        ],
      },
      {
        id: "quarto_3",
        name: "Quarto 3",
        appliances: [
            { id: generateId(), name: "Televisão", power: 100, usageHoursPerDay: 2 },
            { id: generateId(), name: "Ar Condicionado", power: 750, usageHoursPerDay: 0 },
            { id: generateId(), name: "Lâmpada", power: 12, usageHoursPerDay: 4 },
        ],
      },
      {
        id: "sala",
        name: "Sala",
        appliances: [
          { id: generateId(), name: "Televisão", power: 200, usageHoursPerDay: 5 },
          { id: generateId(), name: "Lâmpada", power: 25, usageHoursPerDay: 6 },
          { id: generateId(), name: "Ventilador", power: 100, usageHoursPerDay: 8 },
        ],
      },
      {
        id: "lavanderia",
        name: "Lavanderia",
        appliances: [
          { id: generateId(), name: "Lâmpada", power: 10, usageHoursPerDay: 1 },
          { id: generateId(), name: "Máquina de Lavar", power: 500, usageHoursPerDay: 0.5 },
        ],
      },
      {
        id: "escritorio",
        name: "Escritório",
        appliances: [
          { id: generateId(), name: "Impressora", power: 30, usageHoursPerDay: 0.1 },
          { id: generateId(), name: "Ar Condicionado", power: 1000, usageHoursPerDay: 6 },
          { id: generateId(), name: "Lâmpada", power: 15, usageHoursPerDay: 8 },
        ],
      },
      { id: "garagem", name: "Garagem", appliances: [
        { id: generateId(), name: "Lâmpada", power: 20, usageHoursPerDay: 1 },
      ] },
      { id: "corredor", name: "Corredor", appliances: [
        { id: generateId(), name: "Lâmpada", power: 10, usageHoursPerDay: 3 },
      ] },
];
