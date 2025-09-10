"use client";

import { useEnergy } from "@/hooks/use-energy";
import { useState } from "react";
import RoomModal from "./room-modal";
import { Card } from "./ui/card";
import { Lamp, Utensils, Bed, ShowerHead, Tv, WashingMachine, Laptop, Wind, Printer, Car, Refrigerator, Microwave, CookingPot } from 'lucide-react';
import { cn } from "@/lib/utils";

const roomIcons: { [key: string]: React.ReactNode } = {
  cozinha: <Utensils />,
  sala: <Tv />,
  lavanderia: <WashingMachine />,
  quarto_1: <Bed />,
  banheiro_1: <ShowerHead />,
  escritorio: <Laptop />,
  quarto_2: <Bed />,
  quarto_3: <Bed />,
  suite: <Bed />,
  banheiro_suite: <ShowerHead />,
  corredor: <Lamp />,
  garagem: <Car />,
};

const applianceIcons: { [key: string]: React.ReactNode } = {
    'Chuveiro': <ShowerHead className="w-4 h-4" />,
    'Lâmpada': <Lamp className="w-4 h-4" />,
    'Televisão': <Tv className="w-4 h-4" />,
    'Ar Condicionado': <Wind className="w-4 h-4" />,
    'Geladeira': <Refrigerator className="w-4 h-4" />,
    'Fogão': <CookingPot className="w-4 h-4" />,
    'Micro-ondas': <Microwave className="w-4 h-4" />,
    'Ventilador': <Wind className="w-4 h-4" />,
    'Impressora': <Printer className="w-4 h-4" />,
    'Máquina de Lavar': <WashingMachine className="w-4 h-4" />,
};


export default function FloorPlan() {
  const { getRoomById } = useEnergy();
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  const handleRoomClick = (roomId: string) => {
    setSelectedRoomId(roomId);
  };

  const handleModalClose = () => {
    setSelectedRoomId(null);
  };

  const renderRoom = (roomId: string, className: string) => {
    const room = getRoomById(roomId);
    if (!room) return null;

    const totalAppliances = room.appliances.length;
    const roomBgColors: { [key: string]: string } = {
        suite: 'bg-blue-200',
        banheiro_suite: 'bg-blue-300',
        quarto_2: 'bg-purple-200',
        cozinha: 'bg-orange-200',
        banheiro_1: 'bg-gray-300',
        quarto_3: 'bg-teal-200',
        sala: 'bg-green-200',
        lavanderia: 'bg-indigo-200',
        escritorio: 'bg-pink-200',
        garagem: 'bg-yellow-200',
        corredor: 'bg-gray-200',
    };

    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center p-4 rounded-md text-gray-800 font-bold text-center cursor-pointer hover:ring-2 hover:ring-primary hover:ring-offset-2 transition-all duration-300 min-h-[100px] shadow-inner",
          roomBgColors[roomId],
          className
        )}
        onClick={() => handleRoomClick(room.id)}
      >
        <div className="flex items-center gap-2 mb-2">
            {roomIcons[room.id]}
            <span className="text-sm md:text-base">{room.name}</span>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
            {room.appliances.slice(0,3).map(appliance => (
                 <div key={appliance.id} className="p-1.5 bg-black/10 rounded-full" title={appliance.name}>
                    {applianceIcons[appliance.name] || <Lamp className="w-3 h-3"/>}
                 </div>
            ))}
            {totalAppliances > 3 && <div className="p-1.5 text-xs bg-black/10 rounded-full">+{totalAppliances - 3}</div>}
        </div>
      </div>
    );
  };

  return (
    <>
      <Card className="p-4 md:p-6 shadow-lg bg-card/50">
        <div className="grid grid-cols-[1.5fr_1fr_1fr_1.5fr] grid-rows-[auto] gap-2 max-w-5xl mx-auto">
          {renderRoom("garagem", "col-start-1 col-end-3 row-start-1")}
          {renderRoom("escritorio", "col-start-3 col-end-4 row-start-1")}
          {renderRoom("lavanderia", "col-start-4 col-end-5 row-start-1")}
          {renderRoom("sala", "col-start-1 col-end-3 row-start-2 row-span-2")}
          {renderRoom("quarto_3", "col-start-3 col-end-4 row-start-2")}
          {renderRoom("banheiro_1", "col-start-4 col-end-5 row-start-2")}
          {renderRoom("corredor", "col-start-3 col-end-5 row-start-3")}
          {renderRoom("cozinha", "col-start-1 col-end-3 row-start-4 row-span-2")}
          {renderRoom("quarto_2", "col-start-3 col-end-4 row-start-4")}
          {renderRoom("banheiro_suite", "col-start-4 col-end-5 row-start-4")}
          {renderRoom("suite", "col-start-3 col-end-5 row-start-5")}
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
