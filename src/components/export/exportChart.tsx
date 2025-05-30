
import { Download, Loader2 } from "lucide-react";
import { Button } from "../ui/buttons/button";
import { useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

interface Props {
    disable: boolean;
}

export default function ExportButton({
    disable,
}: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const exportToPDF = () => {
        setIsLoading(true);

        setTimeout(() => {
            const charts = document.querySelectorAll('.chart-container') as NodeListOf<HTMLElement>;

            const doc = new jsPDF('landscape');
            const promises = Array.from(charts).map((chart, index) => {
                return new Promise<void>((resolve) => {
                    html2canvas(chart, {
                        scale: 1,
                        useCORS: true,
                        logging: true,
                    }).then((canvas) => {
                        const imgData = canvas.toDataURL('image/png');
                        if (index > 0) doc.addPage();
                        doc.addImage(imgData, 'PNG', 10, 10, 280, 160);
                        resolve();
                    });
                });
            });

            Promise.all(promises).then(() => {
                doc.save('Graficas.pdf');
                setIsLoading(false);
            });
        }, 1000);
    };

    return (
        <Button
            variant="outline"
            className={
                "bg-green-100 text-green-700 border-green-300 " +
                (disable
                    ? "hover:bg-green-100 hover:text-green-700"
                    : "hover:bg-green-200")
            }
            onClick={exportToPDF}
            type="button"
            disabled={disable}
        >
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Cargando...
                </>
            ) : (
                <>
                    <Download className="mr-2 h-4 w-4" />
                    Exportar Graficas
                </>
            )}
        </Button>
    );
}