import TipsClient from "@/components/tips-client";

export default function DicasPage() {
    return (
        <div className="container py-8">
            <div className="flex flex-col gap-4 mb-8">
                <h1 className="text-3xl font-bold tracking-tight font-headline">
                    Dicas de Economia de Energia
                </h1>
                <p className="text-muted-foreground">
                    Confira dicas úteis para reduzir seu consumo de energia e anote seus planos de economia.
                </p>
            </div>
            <TipsClient />
        </div>
    );
}
