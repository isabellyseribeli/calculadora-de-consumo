"use client";

import { useEnergy } from "@/hooks/use-energy";
import { StatsCard } from "./stats-card";
import { DollarSign, Zap, Sun, Moon, SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TARIFF_RATES } from "@/lib/constants";
import { TariffFlag } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function DashboardClient() {
  const {
    totalMonthlyKwh,
    totalDailyKwh,
    totalMonthlyCost,
    totalDailyCost,
    tariffFlag,
    setTariffFlag,
    isClient,
  } = useEnergy();

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Dashboard de Consumo
        </h1>
        <p className="text-muted-foreground">
          Visão geral do consumo de energia da sua residência.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatsCard
          title="Custo Mensal Estimado"
          value={formatCurrency(totalMonthlyCost)}
          description="Estimativa para 30 dias"
          icon={<DollarSign />}
        />
        <StatsCard
          title="Consumo Mensal Estimado"
          value={`${totalMonthlyKwh.toFixed(2)} kWh`}
          description="Estimativa para 30 dias"
          icon={<Zap />}
        />
        <StatsCard
          title="Custo Diário Estimado"
          value={formatCurrency(totalDailyCost)}
          description="Média diária"
          icon={<Sun />}
        />
        <StatsCard
          title="Consumo Diário Estimado"
          value={`${totalDailyKwh.toFixed(2)} kWh`}
          description="Média diária"
          icon={<Moon />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
                <SlidersHorizontal className="w-5 h-5"/>
                Ajuste da Bandeira Tarifária
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Selecione a bandeira tarifária atual da sua região para ajustar os
              cálculos de custo.
            </p>
            <Select
              value={tariffFlag}
              onValueChange={(value) => setTariffFlag(value as TariffFlag)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione a bandeira">
                  {isClient ? TARIFF_RATES[tariffFlag].label : ''}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {Object.entries(TARIFF_RATES).map(([key, { label }]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        {totalMonthlyKwh === 0 && (
          <Card className="lg:col-span-2 bg-primary/10 border-primary/20 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Comece a usar!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80">
                Bem-vindo ao EcoWatt! Para ver seus dados de consumo, vá para a página <a href="/planta-da-casa" className="font-bold underline hover:text-primary">Planta da Casa</a> e comece a adicionar seus eletrodomésticos em cada cômodo.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
