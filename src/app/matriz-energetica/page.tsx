import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

export default function MatrizEnergeticaPage() {
    const heroImage = PlaceHolderImages.find(p => p.id === "energy-matrix-infographic");

    return (
        <div className="container py-8">
            <div className="flex flex-col gap-4 mb-8">
                <h1 className="text-3xl font-bold tracking-tight font-headline">
                    Matriz Elétrica vs. Matriz Energética
                </h1>
                <p className="text-muted-foreground">
                    Entenda a diferença entre esses dois conceitos fundamentais.
                </p>
            </div>

            <Card className="mb-8 overflow-hidden shadow-lg">
                {heroImage && 
                    <div className="w-full h-64 relative">
                        <Image 
                            src={heroImage.imageUrl} 
                            alt={heroImage.description}
                            fill
                            style={{objectFit: 'cover'}}
                            data-ai-hint={heroImage.imageHint}
                        />
                    </div>
                }
                <CardContent className="p-6">
                    <p className="text-lg text-center text-muted-foreground">
                        Embora pareçam sinônimos, os termos "matriz energética" e "matriz elétrica" representam recortes diferentes de como um país consome e gera sua energia.
                    </p>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">Matriz Energética</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-foreground/90">
                        <p>
                            A <strong>Matriz Energética</strong> representa o conjunto de todas as fontes de energia disponíveis em um país, estado ou região para suprir suas necessidades. Ela é mais abrangente e inclui tudo o que é usado para gerar força e calor.
                        </p>
                        <p>
                            Isso engloba não apenas a energia que vai para as tomadas, mas também os combustíveis para transporte (gasolina, diesel, etanol), o gás para cozinhar e aquecer água, o carvão para a indústria, entre outros.
                        </p>
                        <p>
                            Portanto, a matriz energética é um panorama completo de todas as fontes de energia primária, sejam elas renováveis (hídrica, solar, eólica, biomassa) ou não renováveis (petróleo, carvão mineral, gás natural).
                        </p>
                    </CardContent>
                </Card>
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">Matriz Elétrica</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-foreground/90">
                        <p>
                            A <strong>Matriz Elétrica</strong>, por outro lado, é uma parte da matriz energética. Ela se refere especificamente ao conjunto de fontes utilizadas para a geração de <strong>energia elétrica</strong>.
                        </p>
                        <p>
                            Quando você acende uma lâmpada, liga a televisão ou carrega seu celular, está consumindo energia que veio da matriz elétrica. Ela foca exclusivamente nas usinas que transformam diferentes formas de energia em eletricidade.
                        </p>
                        <p>
                            No Brasil, por exemplo, a matriz elétrica é predominantemente renovável, graças à grande participação das usinas hidrelétricas. Já a matriz energética total ainda tem uma grande dependência de combustíveis fósseis, principalmente no setor de transportes.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
