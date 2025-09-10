"use client";

import { useEnergy } from "@/hooks/use-energy";
import { useState } from "react";
import RoomModal from "./room-modal";
import { Card } from "./ui/card";
import { Lamp, Utensils, Bed, ShowerHead, Tv, WashingMachine, Laptop, Wind, Printer, Car, Refrigerator, Microwave, CookingPot } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

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
  const { getRoomById, isClient } = useEnergy();
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  const handleRoomClick = (roomId: string) => {
    setSelectedRoomId(roomId);
  };

  const handleModalClose = () => {
    setSelectedRoomId(null);
  };

  const renderRoom = (roomId: string, gridArea: string) => {
    const room = getRoomById(roomId);
    if (!room) return null;

    const totalAppliances = room.appliances.length;
    const roomBgColors: { [key: string]: string } = {
        suite: 'bg-pink-300',
        banheiro_suite: 'bg-purple-300',
        quarto_2: 'bg-blue-300',
        cozinha: 'bg-gray-300',
        banheiro_1: 'bg-orange-300',
        quarto_3: 'bg-yellow-600/50',
        sala: 'bg-green-400',
        lavanderia: 'bg-red-400',
        escritorio: 'bg-cyan-300',
        garagem: 'bg-yellow-300',
        corredor: 'bg-yellow-200',
    };

    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center p-4 rounded-md text-gray-800 font-bold text-center cursor-pointer hover:ring-2 hover:ring-primary hover:ring-offset-2 transition-all duration-300 min-h-[100px] shadow-inner",
          roomBgColors[roomId]
        )}
        style={{ gridArea }}
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
  
  const renderSkeleton = () => (
    <Card className="p-4 md:p-6 shadow-lg bg-card/50">
        <div className="grid grid-cols-3 grid-rows-6 gap-2 max-w-4xl mx-auto h-[70vh]">
            <Skeleton className="col-start-1 row-start-1 row-span-4" />
            <Skeleton className="col-start-2 row-start-1" />
            <Skeleton className="col-start-3 row-start-1" />
            <Skeleton className="col-start-2 row-start-2" />
            <Skeleton className="col-start-3 row-start-2 row-span-3" />
            <Skeleton className="col-start-2 row-start-3" />
            <Skeleton className="col-start-2 row-start-4" />
            <Skeleton className="col-start-1 col-span-2 row-start-5" />
            <Skeleton className="col-start-3 row-start-5" />
            <Skeleton className="col-start-1 row-start-6" />
            <Skeleton className="col-start-2 col-span-2 row-start-6" />
        </div>
    </Card>
  );

  if (!isClient) {
    return renderSkeleton();
  }


  return (
    <>
      <Card className="p-4 md:p-6 shadow-lg bg-card/50">
        <div 
          className="grid gap-2 max-w-4xl mx-auto h-[70vh]"
          style={{
            gridTemplateAreas: `
              'corredor suite          banheiro_suite'
              'corredor quarto_2       cozinha'
              'corredor banheiro_1     cozinha'
              'corredor quarto_3       cozinha'
              'sala     sala           lavanderia'
              'escritorio garagem      garagem'
            `,
            gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr',
            gridTemplateColumns: '0.5fr 1.5fr 1fr'
          }}
        >
          {renderRoom("corredor", "corredor")}
          {renderRoom("suite", "suite")}
          {renderRoom("banheiro_suite", "banheiro_suite")}
          {renderRoom("quarto_2", "quarto_2")}
          {renderRoom("cozinha", "cozinha")}
          {renderRoom("banheiro_1", "banheiro_1")}
          {renderRoom("quarto_3", "quarto_3")}
          {renderRoom("sala", "sala")}
          {renderRoom("lavanderia", "lavanderia")}
          {renderRoom("escritorio", "escritorio")}
          {renderRoom("garagem", "garagem")}
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
