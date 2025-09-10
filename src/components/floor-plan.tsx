"use client";

import { useEnergy } from "@/hooks/use-energy";
import { Button } from "./ui/button";
import { useState } from "react";
import RoomModal from "./room-modal";
import { Card } from "./ui/card";
import { Lamp, Utensils, Bed, Shower, Tv, WashingMachine, Laptop } from 'lucide-react';
import { cn } from "@/lib/utils";

const roomIcons: { [key: string]: React.ReactNode } = {
  cozinha: <Utensils />,
  sala: <Tv />,
  lavanderia: <WashingMachine />,
  quarto_1: <Bed />,
  banheiro_social: <Shower />,
  escritorio: <Laptop />,
  quarto_2: <Bed />,
  suite: <Bed />,
  banheiro_suite: <Shower />,
};

export default function FloorPlan() {
  const { rooms } = useEnergy();
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  const handleRoomClick = (roomId: string) => {
    setSelectedRoomId(roomId);
  };

  const handleModalClose = () => {
    setSelectedRoomId(null);
  };

  return (
    <>
      <Card className="p-4 md:p-6 shadow-lg">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {rooms.map((room) => {
            const totalWatts = room.appliances.reduce((sum, app) => sum + app.power, 0);

            return (
              <Button
                key={room.id}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center justify-center gap-2 aspect-square text-center transition-all duration-300 hover:bg-accent/50 hover:shadow-md hover:-translate-y-1"
                onClick={() => handleRoomClick(room.id)}
              >
                <div className="text-primary">{roomIcons[room.id] || <Lamp />}</div>
                <span className="font-semibold font-headline">{room.name}</span>
                <span className={cn(
                  "text-xs text-muted-foreground",
                  totalWatts > 0 && "text-primary font-medium"
                )}>
                  {room.appliances.length} aparelhos
                </span>
                 <span className="text-xs text-muted-foreground">
                  {totalWatts} W
                </span>
              </Button>
            );
          })}
        </div>
      </Card>

      <RoomModal
        roomId={selectedRoomId}
        isOpen={!!selectedRoomId}
        onClose={handleModalClose}
      />
    </>
  );
}
