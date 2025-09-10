"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useEnergy } from "@/hooks/use-energy";
import { Button } from "./ui/button";
import { Plus, Edit, Trash2, Power } from "lucide-react";
import { useState } from "react";
import ApplianceForm from "./appliance-form";
import { Appliance } from "@/lib/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

interface RoomModalProps {
  roomId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function RoomModal({ roomId, isOpen, onClose }: RoomModalProps) {
  const { getRoomById, removeAppliance, getApplianceConsumption } = useEnergy();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAppliance, setEditingAppliance] = useState<Appliance | null>(
    null
  );

  const room = roomId ? getRoomById(roomId) : null;

  const handleAddClick = () => {
    setEditingAppliance(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (appliance: Appliance) => {
    setEditingAppliance(appliance);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingAppliance(null);
  };

  if (!room) return null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl">{room.name}</DialogTitle>
            <DialogDescription>
              Gerencie os eletrodomésticos neste cômodo.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {room.appliances.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <p>Nenhum aparelho adicionado ainda.</p>
                <p>Clique em "Adicionar Aparelho" para começar.</p>
              </div>
            ) : (
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-4">
                  {room.appliances.map((app) => {
                    const { monthlyKwh } = getApplianceConsumption(app);
                    return (
                        <div key={app.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                            <div>
                                <p className="font-semibold">{app.name}</p>
                                <div className="text-sm text-muted-foreground flex items-center gap-4 mt-1">
                                    <span className="flex items-center gap-1"><Power className="w-3 h-3"/> {app.power}W</span>
                                    <span>{app.usageHoursPerDay}h/dia</span>
                                    <span>{monthlyKwh.toFixed(2)} kWh/mês</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="icon" onClick={() => handleEditClick(app)}>
                                    <Edit className="h-4 w-4" />
                                    <span className="sr-only">Editar</span>
                                </Button>

                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                        <Trash2 className="h-4 w-4" />
                                        <span className="sr-only">Remover</span>
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Essa ação não pode ser desfeita. Isso removerá permanentemente o aparelho <span className="font-bold">{app.name}</span>.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => removeAppliance(room.id, app.id)}>Remover</AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    )
                  })}
                </div>
              </ScrollArea>
            )}
          </div>
          <DialogFooter>
            <Button onClick={handleAddClick}>
              <Plus className="mr-2 h-4 w-4" /> Adicionar Aparelho
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {isFormOpen && (
        <ApplianceForm
          isOpen={isFormOpen}
          onClose={handleFormClose}
          roomId={room.id}
          appliance={editingAppliance}
        />
      )}
    </>
  );
}
