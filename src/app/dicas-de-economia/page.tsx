import TipsClient from "@/components/tips-client";

export default function DicasPage() {
    return (
        <div className="container py-8">
            <div className="flex flex-col gap-4 mb-8">
                <h1 className="text-3xl font-bold tracking-tight font-headline">
                    Dicas de Economia de Energia
                </h1>
                <p className="text-muted-foreground">
                    Receba dicas personalizadas da nossa IA para reduzir seu consumo de energia.
                </p>
            </div>
            <TipsClient />
        </div>
    );
}
