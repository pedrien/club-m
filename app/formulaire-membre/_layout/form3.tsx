import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

interface Form3Props {
  formData: any;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onRadioChange: (name: string, value: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

const Form3: React.FC<Form3Props> = ({
  formData,
  onChange,
  onRadioChange,
  onNext,
  onPrev,
}) => {
  const besoinsOptions = [
    "Clarifier mon idée et structurer mon projet",
    "Construire mon business plan pas à pas",
    "Être accompagnée pour lancer mon business",
    "Développer mon chiffre d'affaires",
    "Trouver des financements (banque, investisseurs, etc.)",
    "M'intégrer dans un réseau de femmes entrepreneures",
    "Accéder à des formations et ateliers pratiques",
    "Gagner en visibilité (communication, réseaux sociaux, image de marque)",
  ];

  const typeAccompagnementOptions = [
    "Accompagnement individuel (coaching personnalisé)",
    "Accompagnement en groupe (ateliers, masterclass)",
    "Les deux",
  ];

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-4xl md:text-4xl font-bold mb-3 animate-fade-in">
          Ce que vous attendez du Club M
        </h2>
        <p className="text-muted-foreground mb-8">
          identifier les besoins prioritaires pour orienter l'accompagnement,
          les ate- liers et les offres.
        </p>
      </div>
      <div className="space-y-6 animate-fade-in-delay">
        <div>
          <label className="block text-sm font-medium mb-4">
            Vos besoins prioritaires
          </label>
          <div className="flex flex-wrap gap-2">
            {besoinsOptions.map((option) => {
              const isChecked =
                formData.besoinsPrioritaires?.includes(option) || false;
              return (
                <div
                  key={option}
                  className="itemSelected relative flex items-center justify-center"
                >
                  <input
                    type="checkbox"
                    name="besoins"
                    id={`besoin-${option}`}
                    value={option}
                    checked={isChecked}
                    onChange={onChange}
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div
                    className={`content-itemSelected relative flex items-center justify-center border rounded-lg p-2 text-sm transition-colors ${
                      isChecked
                        ? "border-black bg-black text-white"
                        : "border-[#e5e5e5] text-black"
                    }`}
                  >
                    <p>{option}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <label
            htmlFor="objectifPrincipal"
            className="block text-sm font-medium mb-2"
          >
            Votre objectif principal sur 12 mois
          </label>
          <Input
            type="text"
            id="objectifPrincipal"
            name="objectifPrincipal"
            value={formData.objectifPrincipal}
            onChange={onChange}
            className="shadow-none h-[42px] focus-visible:ring-0 focus-visible:border-black rounded-lg"
            required
            placeholder="Ex: Doubler mon chiffre d'affaires, Lancer mon business, etc."
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-4">
            Quel type d'accompagnement préférez-vous?
          </label>
          <div className="flex flex-wrap gap-2">
            {typeAccompagnementOptions.map((option) => (
              <div
                key={option}
                className="itemSelected relative flex items-center justify-center"
              >
                <input
                  type="radio"
                  name="typeAccompagnement"
                  id={`type-${option}`}
                  value={option}
                  checked={formData.typeAccompagnement === option}
                  onChange={() => onRadioChange("typeAccompagnement", option)}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div
                  className={`content-itemSelected relative flex items-center justify-center border rounded-lg p-2 text-sm transition-colors ${
                    formData.typeAccompagnement === option
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
            Précédent
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

export default Form3;
