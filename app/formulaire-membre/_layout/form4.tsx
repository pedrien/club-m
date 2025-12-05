import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import React from "react";

interface Form4Props {
  formData: any;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onRadioChange: (name: string, value: string) => void;
  onPrev: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  errorMessage: string;
  successMessage: string;
  isStepValid: boolean;
}

const Form4: React.FC<Form4Props> = ({
  formData,
  onChange,
  onRadioChange,
  onPrev,
  onSubmit,
  isSubmitting,
  errorMessage,
  successMessage,
  isStepValid,
}) => {
  const connuOptions = [
    "Réseaux sociaux",
    "Recommandation d'une amie",
    "Événement / atelier",
    "Partenaire (banque, ONG, etc.)",
    "Autre",
  ];

  const handleCheckboxChange = (name: string, checked: boolean) => {
    onChange({
      target: {
        name,
        type: "checkbox",
        checked,
      },
    } as any);
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-4xl md:text-4xl font-bold mb-3 animate-fade-in">
          Vos informations personnelles
        </h2>
        <p className="text-muted-foreground mb-8">
          collecter les coordonnées nécessaires pour recontacter la candidate et
          fina- liser son inscription.
        </p>
      </div>
      <div className="space-y-6 animate-fade-in-delay">
        {errorMessage && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
            {successMessage}
          </div>
        )}
        <div>
          <label htmlFor="nom" className="block text-sm font-medium mb-2">
            Nom
          </label>
          <Input
            type="text"
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={onChange}
            className="shadow-none h-[42px] focus-visible:ring-0 focus-visible:border-black rounded-lg"
            required
            placeholder="Votre nom"
          />
        </div>
        <div>
          <label htmlFor="prenom" className="block text-sm font-medium mb-2">
            Prénom
          </label>
          <Input
            type="text"
            id="prenom"
            name="prenom"
            value={formData.prenom}
            onChange={onChange}
            className="shadow-none h-[42px] focus-visible:ring-0 focus-visible:border-black rounded-lg"
            required
            placeholder="Votre prénom"
          />
        </div>
        <div>
          <label
            htmlFor="dateNaissance"
            className="block text-sm font-medium mb-2"
          >
            Date de naissance
          </label>
          <Input
            type="date"
            id="dateNaissance"
            name="dateNaissance"
            value={formData.dateNaissance}
            onChange={onChange}
            className="shadow-none h-[42px] focus-visible:ring-0 focus-visible:border-black rounded-lg"
            required
          />
        </div>
        <div>
          <label htmlFor="telephone" className="block text-sm font-medium mb-2">
            Numéro de téléphone (WhatsApp)
          </label>
          <Input
            type="text"
            id="telephone"
            name="telephone"
            value={formData.telephone}
            onChange={onChange}
            className="shadow-none h-[42px] focus-visible:ring-0 focus-visible:border-black rounded-lg"
            required
            placeholder="Ex: +243821234567"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Adresse e-mail
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            className="shadow-none h-[42px] focus-visible:ring-0 focus-visible:border-black rounded-lg"
            required
            placeholder="Ex: example@gmail.com"
          />
        </div>
        <div>
          <label htmlFor="villePays" className="block text-sm font-medium mb-2">
            Ville & Pays
          </label>
          <Input
            type="text"
            id="villePays"
            name="villePays"
            value={formData.villePays}
            onChange={onChange}
            className="shadow-none h-[42px] focus-visible:ring-0 focus-visible:border-black rounded-lg"
            required
            placeholder="Ex: Kinshasa, Congo"
          />
        </div>
        <div>
          <label
            htmlFor="nomEntreprise"
            className="block text-sm font-medium mb-2"
          >
            Nom de votre entreprise (facultatif)
          </label>
          <Input
            type="text"
            id="nomEntreprise"
            name="nomEntreprise"
            value={formData.nomEntreprise}
            onChange={onChange}
            className="shadow-none h-[42px] focus-visible:ring-0 focus-visible:border-black rounded-lg"
            placeholder="Ex: Entreprise Inc."
          />
        </div>
        <div>
          <label htmlFor="siteWeb" className="block text-sm font-medium mb-2">
            Site web / Page Facebook / Instagram (facultatif)
          </label>
          <Input
            type="text"
            id="siteWeb"
            name="siteWeb"
            value={formData.siteWeb}
            onChange={onChange}
            className="shadow-none h-[42px] focus-visible:ring-0 focus-visible:border-black rounded-lg"
            placeholder="Ex: https://www.entreprise.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-4">
            Comment avez-vous connu le Club M?
          </label>
          <div className="flex flex-wrap gap-2">
            {connuOptions.map((option) => (
              <div
                key={option}
                className="itemSelected relative flex items-center justify-center"
              >
                <input
                  type="radio"
                  name="connuClubM"
                  id={`connu-${option}`}
                  value={option}
                  checked={formData.connuClubM === option}
                  onChange={() => onRadioChange("connuClubM", option)}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div
                  className={`content-itemSelected relative flex items-center justify-center border rounded-lg p-2 text-sm transition-colors ${
                    formData.connuClubM === option
                      ? "border-black bg-black text-white"
                      : "border-[#e5e5e5] text-black"
                  }`}
                >
                  <p>{option}</p>
                </div>
              </div>
            ))}
          </div>
          {formData.connuClubM && (
            <div className="mt-4">
              <label
                htmlFor="connuClubMDetail"
                className="block text-sm font-medium mb-2"
              >
                Précisez
              </label>
              <Input
                type="text"
                id="connuClubMDetail"
                name="connuClubMDetail"
                value={formData.connuClubMDetail}
                onChange={onChange}
                className="shadow-none h-[42px] focus-visible:ring-0 focus-visible:border-black rounded-lg"
                placeholder="Ex: Facebook, Instagram, etc."
              />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Checkbox
              id="confirmeInfos"
              checked={formData.confirmeInfos}
              onCheckedChange={(checked) =>
                handleCheckboxChange("confirmeInfos", checked as boolean)
              }
            />
            <label
              htmlFor="confirmeInfos"
              className="block text-sm font-medium"
            >
              Je confirme que les informations fournies sont exactes.
            </label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="accepteContact"
              checked={formData.accepteContact}
              onCheckedChange={(checked) =>
                handleCheckboxChange("accepteContact", checked as boolean)
              }
            />
            <label
              htmlFor="accepteContact"
              className="block text-sm font-medium"
            >
              J'accepte d'être contactée par le Club M concernant mon adhésion
              et les activités du Club.
            </label>
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
            onClick={onSubmit}
            disabled={isSubmitting || !isStepValid}
            className="flex-1 bg-[#d7f75b] text-black cursor-pointer h-11 shadow-none rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#d7f75b]/80 hover:text-black"
          >
            {isSubmitting ? "Envoi en cours..." : "Valider"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Form4;
