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
        suite: 'bg-pink-300',
        banheiro_suite: 'bg-purple-300',
        quarto_2: 'bg-indigo-300',
        cozinha: 'bg-gray-300',
        banheiro_1: 'bg-orange-300',
        quarto_3: 'bg-amber-700/50',
        sala: 'bg-green-500',
        lavanderia: 'bg-red-500',
        escritorio: 'bg-cyan-300',
        garagem: 'bg-yellow-400',
        corredor: 'bg-yellow-300',
    };

    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center p-4 rounded-md text-gray-800 font-bold text-center cursor-pointer hover:ring-2 hover:ring-primary hover:ring-offset-2 transition-all duration-300 min-h-[100px]",
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
        <div className="grid grid-cols-[1fr_2fr_2fr] grid-rows-[auto] gap-2 max-w-4xl mx-auto">
            {renderRoom("corredor", "row-span-4")}
            {renderRoom("suite", "col-span-1")}
            {renderRoom("banheiro_suite", "col-span-1")}
            {renderRoom("quarto_2", "col-span-1")}
            {renderRoom("cozinha", "row-span-3")}
            {renderRoom("banheiro_1", "col-span-1")}
            {renderRoom("quarto_3", "col-span-1")}
            {renderRoom("sala", "col-start-1 col-end-3")}
            {renderRoom("lavanderia", "")}
            {renderRoom("escritorio", "col-start-1 col-end-2")}
            {renderRoom("garagem", "col-start-2 col-end-4")}
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
