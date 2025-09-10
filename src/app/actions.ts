"use server";

import { getPersonalizedEnergySavingTips } from "@/ai/flows/personalized-energy-saving-tips";
import { Room } from "@/lib/types";
import { z } from "zod";

const actionSchema = z.object({
  householdSize: z.coerce.number().min(1),
  location: z.string().min(2),
  averageMonthlyConsumption: z.number(),
  rooms: z.array(z.any()),
});

export async function getTipsAction(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());

  // Manually parsing rooms because FormData stringifies it.
  const parsedRooms = JSON.parse(rawData.rooms as string);
  
  const validatedData = actionSchema.safeParse({
    ...rawData,
    rooms: parsedRooms
  });

  if (!validatedData.success) {
    return { error: "Dados inválidos." };
  }
  
  const { householdSize, location, averageMonthlyConsumption, rooms } = validatedData.data;

  const applianceUsage = rooms.reduce((acc: Record<string, number>, room: Room) => {
    room.appliances.forEach(appliance => {
        if (acc[appliance.name]) {
            acc[appliance.name] += appliance.usageHoursPerDay;
        } else {
            acc[appliance.name] = appliance.usageHoursPerDay;
        }
    });
    return acc;
  }, {});

  try {
    const tips = await getPersonalizedEnergySavingTips({
      householdSize,
      location,
      averageMonthlyConsumption,
      applianceUsage,
    });
    return { data: tips };
  } catch (e) {
    console.error(e);
    return { error: "Ocorreu um erro ao gerar as dicas. Tente novamente." };
  }
}
