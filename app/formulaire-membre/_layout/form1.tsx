import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

interface Form1Props {
  formData: any;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onRadioChange: (name: string, value: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

const Form1: React.FC<Form1Props> = ({
  formData,
  onChange,
  onRadioChange,
  onNext,
  onPrev,
}) => {
  const statutOptions = [
    "J'ai déjà un business en activité",
    "Je suis en cours de création",
    "J'ai une idée mais je ne sais pas par où commencer",
    "Je souhaite être accompagnée pour clarifier mon projet",
  ];

  const dureeOptions = [
    "Moins de 6 mois",
    "Entre 6 mois et 2 ans",
    "Plus de 2 ans",
  ];

  const businessPlanOptions = [
    "Oui, structuré et à jour",
    "Oui, mais à retravailler",
    "Non, pas encore",
  ];

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-4xl md:text-4xl font-bold mb-3 animate-fade-in">
          Votre situation actuelle
        </h2>
        <p className="text-muted-foreground mb-8">
          comprendre rapidement où en est la candidate dans son parcours entre-
          preneurial.
        </p>
      </div>
      <div className="space-y-6 animate-fade-in-delay">
        <div>
          <label className="block text-sm font-medium mb-4">
            Statut de votre projet
          </label>
          <div className="flex flex-wrap gap-2">
            {statutOptions.map((option) => (
              <div
                key={option}
                className="itemSelected relative flex items-center justify-center"
              >
                <input
                  type="radio"
                  name="statutProjet"
                  id={`statut-${option}`}
                  value={option}
                  checked={formData.statutProjet === option}
                  onChange={() => onRadioChange("statutProjet", option)}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div
                  className={`content-itemSelected relative flex items-center justify-center border rounded-lg p-2 text-sm transition-colors ${
                    formData.statutProjet === option
                      ? "border-black bg-black text-white"
                      : "border-[#e5e5e5] text-black"
                  }`}
                >
                  <p>{option}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label
            htmlFor="activitePrincipale"
            className="block text-sm font-medium mb-2"
          >
            Votre activité principale aujourd'hui
          </label>
          <Input
            type="text"
            id="activitePrincipale"
            name="activitePrincipale"
            value={formData.activitePrincipale}
            onChange={onChange}
            className="shadow-none h-[42px] focus-visible:ring-0 focus-visible:border-black rounded-lg"
            required
            placeholder="Ex: Salon de coiffure, Vente en ligne des vêtements, etc."
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-4">
            Depuis combien de temps êtes-vous dans cette activité?
          </label>
          <div className="flex flex-wrap gap-2">
            {dureeOptions.map((option) => (
              <div
                key={option}
                className="itemSelected relative flex items-center justify-center"
              >
                <input
                  type="radio"
                  name="dureeActivite"
                  id={`duree-${option}`}
                  value={option}
                  checked={formData.dureeActivite === option}
                  onChange={() => onRadioChange("dureeActivite", option)}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div
                  className={`content-itemSelected relative flex items-center justify-center border rounded-lg p-2 text-sm transition-colors ${
                    formData.dureeActivite === option
                      ? "border-black bg-black text-white"
                      : "border-[#e5e5e5] text-black"
                  }`}
                >
                  <p>{option}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-4">
            Avez-vous déjà un business plan ?
          </label>
          <div className="flex flex-wrap gap-2">
            {businessPlanOptions.map((option) => (
              <div
                key={option}
                className="itemSelected relative flex items-center justify-center"
              >
                <input
                  type="radio"
                  name="businessPlan"
                  id={`businessPlan-${option}`}
                  value={option}
                  checked={formData.businessPlan === option}
                  onChange={() => onRadioChange("businessPlan", option)}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div
                  className={`content-itemSelected relative flex items-center justify-center border rounded-lg p-2 text-sm transition-colors ${
                    formData.businessPlan === option
                      ? "border-black bg-black text-white"
                      : "border-[#e5e5e5] text-black"
                  }`}
                >
                  <p>{option}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            onClick={onPrev}
            className="flex-1 bg-[#f5f5f5] text-black cursor-pointer h-11 hover:bg-[#f8f8f8] shadow-none rounded-lg"
          >
            Annuler
          </Button>
          <Button
            onClick={onNext}
            className="flex-1 bg-[#d7f75b] text-black cursor-pointer h-11 shadow-none rounded-lg hover:bg-[#d7f75b]/80 hover:text-black"
          >
            Suivant
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Form1;
