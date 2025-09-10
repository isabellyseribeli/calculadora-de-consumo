"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Lightbulb, Notebook } from "lucide-react";
import { useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";

const energySavingTips = [
    "Aproveite a luz natural: Abra cortinas e persianas durante o dia para iluminar os ambientes sem usar lâmpadas.",
    "Troque lâmpadas incandescentes por LED: As lâmpadas de LED consomem até 85% menos energia e duram muito mais.",
    "Desligue aparelhos em stand-by: Eletrodomésticos em modo de espera continuam consumindo energia. Desligue-os da tomada quando não estiverem em uso.",
    "Use a máquina de lavar e secar com carga máxima: Acumule roupas para usar a capacidade total das máquinas, otimizando o consumo de água e energia.",
    "Tome banhos mais curtos: O chuveiro elétrico é um dos maiores vilões da conta de luz. Reduzir o tempo no banho faz uma grande diferença.",
    "Verifique a vedação da geladeira: Uma borracha de vedação gasta faz o motor da geladeira trabalhar mais. Verifique se a sua está em bom estado.",
    "Não seque roupas atrás da geladeira: Isso aumenta o consumo de energia do aparelho.",
    "Reduza o uso de ar-condicionado: Em dias mais frescos, prefira ventiladores, que consomem menos energia. Limpe os filtros do ar-condicionado regularmente.",
];

export default function TipsClient() {
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const savedNotes = localStorage.getItem("energywise-notes");
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = event.target.value;
    setNotes(newNotes);
    localStorage.setItem("energywise-notes", newNotes);
    toast({
        title: "Nota salva!",
        description: "Sua anotação foi salva no bloco de notas.",
    })
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
       <Card className="shadow-lg bg-primary/5">
        <CardHeader>
          <CardTitle className="font-headline text-xl flex items-center gap-2">
            <Lightbulb className="w-5 h-5"/>
            Dicas para Economizar
          </CardTitle>
        </CardHeader>
        <CardContent>
            <ul className="space-y-4">
                {energySavingTips.map((tip, index) => (
                    <li key={index} className="flex gap-4 items-start">
                        <Lightbulb className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                        <p className="text-foreground/90">{tip}</p>
                    </li>
                ))}
            </ul>
        </CardContent>
      </Card>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl flex items-center gap-2">
            <Notebook className="w-5 h-5"/>
            Meu Bloco de Notas
          </CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground mb-4">
                Use este espaço para anotar em quais áreas você planeja economizar energia. Suas notas serão salvas automaticamente.
            </p>
            <Textarea 
                value={notes}
                onChange={handleNotesChange}
                placeholder="Ex: Começar a desligar a TV da tomada à noite, tomar banhos de no máximo 10 minutos..."
                className="h-64 resize-none"
            />
        </CardContent>
      </Card>
    </div>
  );
}
