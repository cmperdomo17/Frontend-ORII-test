"use client";

import Title from "@/components/ui/typography/title";
import { MovilityForm } from "@/components/movility/movilityForm";

export default function CreateMovility() {
  return (
    <div>
      <div className="mb-8">
        <Title title="Crear movilidad"></Title>
        <p className="text-muted-foreground mt-2">
          A continuación, podrá crear una movilidad. Por favor, verifique que la información ingresada es correcta.
        </p>
      </div>
      <MovilityForm />
    </div>
  );
}