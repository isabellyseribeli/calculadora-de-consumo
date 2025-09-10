"use client";

import { useEnergy } from "@/hooks/use-energy";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useFormState, useFormStatus } from "react-dom";
import { getTipsAction } from "@/app/actions";
import { Lightbulb, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const initialState = {
  data: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Gerando Dicas...
        </>
      ) : (
        "Obter Dicas Personalizadas"
      )}
    </Button>
  );
}

export default function TipsClient() {
  const { rooms, totalMonthlyKwh } = useEnergy();
  const [state, formAction] = useFormState(getTipsAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
        toast({
            variant: "destructive",
            title: "Erro",
            description: state.error,
        })
    }
  }, [state.error, toast])

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">
            Suas Informações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="householdSize">
                Pessoas na Residência
              </Label>
              <Input
                id="householdSize"
                name="householdSize"
                type="number"
                placeholder="Ex: 4"
                required
                min="1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Sua Cidade/Estado</Label>
              <Input
                id="location"
                name="location"
                placeholder="Ex: São Paulo, SP"
                required
              />
            </div>
            <input type="hidden" name="averageMonthlyConsumption" value={totalMonthlyKwh} />
            <input type="hidden" name="rooms" value={JSON.stringify(rooms)} />
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
      <Card className="shadow-lg bg-primary/5">
        <CardHeader>
          <CardTitle className="font-headline text-xl">
            Dicas da IA
          </CardTitle>
        </CardHeader>
        <CardContent>
            {state.data?.tips ? (
                <ul className="space-y-4">
                    {state.data.tips.map((tip, index) => (
                        <li key={index} className="flex gap-4 items-start">
                            <Lightbulb className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                            <p className="text-foreground/90">{tip}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8">
                    <Lightbulb className="w-12 h-12 mb-4"/>
                    <p>Preencha suas informações ao lado e receba dicas personalizadas para economizar energia.</p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
