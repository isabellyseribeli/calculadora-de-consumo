import { Room, TariffFlag } from "./types";

export const TARIFF_RATES: Record<TariffFlag, { rate: number; label: string }> = {
  verde: { rate: 0.54, label: "Bandeira Verde" },
  amarela: { rate: 0.57, label: "Bandeira Amarela" },
  vermelha1: { rate: 0.60, label: "Bandeira Vermelha P1" },
  vermelha2: { rate: 0.65, label: "Bandeira Vermelha P2" },
};

export const INITIAL_ROOMS: Room[] = [
  { id: "cozinha", name: "Cozinha", appliances: [] },
  { id: "sala", name: "Sala", appliances: [] },
  { id: "lavanderia", name: "Lavanderia", appliances: [] },
  { id: "quarto_1", name: "Quarto 1", appliances: [] },
  { id: "banheiro_social", name: "Banheiro Social", appliances: [] },
  { id: "escritorio", name: "Escritório", appliances: [] },
  { id: "quarto_2", name: "Quarto 2", appliances: [] },
  { id: "suite", name: "Suíte", appliances: [] },
  { id: "banheiro_suite", name: "Banheiro da Suíte", appliances: [] },
];
