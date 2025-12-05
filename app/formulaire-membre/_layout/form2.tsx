import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { validateStep2, FormData as FormDataType } from "@/validators/devenir.membre.validator";

interface Form2Props {
  formData: any;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onRadioChange: (name: string, value: string) => void;
  onNext: () => void;
  onPrev: () => void;
  isStepValid: boolean;
}

const Form2: React.FC<Form2Props> = ({
  formData,
  onChange,
  onRadioChange,
  onNext,
  onPrev,
  isStepValid,
}) => {
  const niveauOptions = [
    "Débutante",
    "En lancement",
    "En croissance",
    "Ambition scale / expansion",
  ];

  // Obtenir les erreurs de validation
  const validationErrors = validateStep2(formData as FormDataType);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-4xl md:text-4xl font-bold mb-3 animate-fade-in">
          Votre niveau dans l'entrepreneuriat
        </h2>
        <p className="text-muted-foreground mb-8">
          positionner la candidate sur un niveau pour adapter les parcours et
          les offres Club M.
        </p>
      </div>
      <div className="space-y-6 animate-fade-in-delay">
        {Object.keys(validationErrors).length > 0 && (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm">
            <p className="font-medium mb-2">Veuillez corriger les erreurs suivantes :</p>
            <ul className="list-disc list-inside space-y-1">
              {Object.entries(validationErrors).map(([field, message]) => (
                <li key={field}>{message}</li>
              ))}
            </ul>
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-4">
            Comment vous situez-vous aujourd'hui
          </label>
          <div className="flex flex-wrap gap-2">
            {niveauOptions.map((option) => (
              <div
                key={option}
                className="itemSelected relative flex items-center justify-center"
              >
                <input
                  type="radio"
                  name="niveauEntrepreneuriat"
                  id={`niveau-${option}`}
                  value={option}
                  checked={formData.niveauEntrepreneuriat === option}
                  onChange={() =>
                    onRadioChange("niveauEntrepreneuriat", option)
                  }
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div
                  className={`content-itemSelected relative flex items-center justify-center border rounded-lg p-2 text-sm transition-colors ${
                    formData.niveauEntrepreneuriat === option
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
            htmlFor="connaissancesGestion"
            className="block text-sm font-medium mb-2"
          >
            Sur une échelle de 1 à 5, comment évaluez-vous vos connaissances en
            gestion d'entreprise
          </label>
          <Input
            type="number"
            id="connaissancesGestion"
            name="connaissancesGestion"
            value={formData.connaissancesGestion}
            onChange={onChange}
            className="shadow-none h-[42px] focus-visible:ring-0 focus-visible:border-black rounded-lg"
            required
            min="1"
            max="5"
            placeholder="Entrez un nombre entre 1 et 5"
          />
          {validationErrors.connaissancesGestion && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.connaissancesGestion}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-4">
            Êtes-vous déjà accompagnée par une structure?
          </label>
          <div className="flex flex-wrap gap-2">
            <div className="itemSelected relative flex items-center justify-center">
              <input
                type="radio"
                name="dejaAccompagnee"
                id="dejaAccompagnee-oui"
                value="Oui"
                checked={formData.dejaAccompagnee === "Oui"}
                onChange={() => onRadioChange("dejaAccompagnee", "Oui")}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div
                className={`content-itemSelected relative flex items-center justify-center border rounded-lg p-2 text-sm transition-colors ${
                  formData.dejaAccompagnee === "Oui"
                    ? "border-black bg-black text-white"
                    : "border-[#e5e5e5] text-black"
                }`}
              >
                <p>Oui</p>
              </div>
            </div>
            <div className="itemSelected relative flex items-center justify-center">
              <input
                type="radio"
                name="dejaAccompagnee"
                id="dejaAccompagnee-non"
                value="Non"
                checked={formData.dejaAccompagnee === "Non"}
                onChange={() => onRadioChange("dejaAccompagnee", "Non")}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div
                className={`content-itemSelected relative flex items-center justify-center border rounded-lg p-2 text-sm transition-colors ${
                  formData.dejaAccompagnee === "Non"
                    ? "border-black bg-black text-white"
                    : "border-[#e5e5e5] text-black"
                }`}
              >
                <p>Non</p>
              </div>
            </div>
          </div>
          {formData.dejaAccompagnee === "Oui" && (
            <div className="mt-4">
              <label
                htmlFor="structureAccompagnement"
                className="block text-sm font-medium mb-2"
              >
                laquelle?
              </label>
              <Input
                type="text"
                id="structureAccompagnement"
                name="structureAccompagnement"
                value={formData.structureAccompagnement}
                onChange={onChange}
                className="shadow-none h-[42px] focus-visible:ring-0 focus-visible:border-black rounded-lg"
                placeholder="Ex: Club M, Business School, etc."
              />
            </div>
          )}
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
            disabled={!isStepValid}
            className="flex-1 bg-[#d7f75b] text-black cursor-pointer h-11 shadow-none rounded-lg hover:bg-[#d7f75b]/80 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Suivant
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Form2;
