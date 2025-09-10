import FloorPlan from "@/components/floor-plan";

export default function PlantaDaCasaPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Planta da Casa
        </h1>
        <p className="text-muted-foreground">
          Clique em um cômodo para adicionar ou gerenciar seus eletrodomésticos.
        </p>
      </div>
      <FloorPlan />
    </div>
  );
}
