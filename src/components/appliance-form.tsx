"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEnergy } from "@/hooks/use-energy";
import { Appliance } from "@/lib/types";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface ApplianceFormProps {
  isOpen: boolean;
  onClose: () => void;
  roomId: string;
  appliance: Appliance | null;
}

const formSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
  power: z.coerce
    .number()
    .min(1, "A potência deve ser maior que 0.")
    .int("A potência deve ser um número inteiro."),
  usageHoursPerDay: z.coerce
    .number()
    .min(0, "O tempo de uso não pode ser negativo.")
    .max(24, "O tempo de uso não pode exceder 24 horas."),
});

export default function ApplianceForm({
  isOpen,
  onClose,
  roomId,
  appliance,
}: ApplianceFormProps) {
  const { addAppliance, updateAppliance } = useEnergy();
  const { toast } = useToast();
  const isEditing = !!appliance;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      power: 0,
      usageHoursPerDay: 0,
    },
  });

  useEffect(() => {
    if (appliance) {
      form.reset({
        name: appliance.name,
        power: appliance.power,
        usageHoursPerDay: appliance.usageHoursPerDay,
      });
    } else {
        form.reset({
            name: "",
            power: 0,
            usageHoursPerDay: 0,
        });
    }
  }, [appliance, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (isEditing && appliance) {
      updateAppliance(roomId, { ...appliance, ...values });
      toast({ title: "Sucesso!", description: "Aparelho atualizado." });
    } else {
      addAppliance(roomId, values);
      toast({ title: "Sucesso!", description: "Aparelho adicionado." });
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">
            {isEditing ? "Editar Aparelho" : "Adicionar Novo Aparelho"}
          </DialogTitle>
          <DialogDescription>
            Preencha as informações do eletrodoméstico abaixo.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Aparelho</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Geladeira, Televisão" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="power"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Potência (em Watts)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Ex: 150" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="usageHoursPerDay"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tempo de Uso (horas por dia)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.5" placeholder="Ex: 8.5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
