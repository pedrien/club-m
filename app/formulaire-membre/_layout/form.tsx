import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Image from "next/image";

const FormMember = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    question: "",
    telephone: "",
    entreprise: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/membre", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage(data.message);
        // Rediriger vers la page de confirmation après 1.5 secondes
        setTimeout(() => {
          router.push("/confirmation");
        }, 1500);
      } else {
        setErrorMessage(data.error || "Une erreur est survenue");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Erreur:", error);
      setErrorMessage("Une erreur est survenue lors de l'envoi du formulaire");
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col">
      <div className="grid grid-cols-12">
        <div className="col-span-5">
          <div className="block-img sticky top-O left-0 h-screen">
            <div className="content-img absolute top-0 left-0 w-full h-full">
              <Image
                src="/images/banner2.png"
                alt="banner"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-7">
          <div className="min-h-screen flex items-center justify-center bg-white relative z-20 rounded-[34px] lg:left-[-50px]">
          <div className="flex-1 container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-4xl md:text-4xl font-bold mb-4 animate-fade-in">
                Devenir membre maintenant
              </h1>
              <p className="text-muted-foreground mb-8">
                Remplissez le formulaire ci-dessous pour faire votre demande
                d'adhésion
              </p>

              {/* Message de succès */}
              {successMessage && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-200 animate-fade-in">
                  {successMessage}
                </div>
              )}

              {/* Message d'erreur */}
              {errorMessage && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-200 animate-fade-in">
                  {errorMessage}
                </div>
              )}

              {/* Formulaire */}
              <form
                onSubmit={handleSubmit}
                className="space-y-6 animate-fade-in-delay"
              >
                {/* Nom */}
                <div>
                  <label
                    htmlFor="nom"
                    className="block text-sm font-medium mb-2"
                  >
                    Nom complet
                  </label>
                  <Input
                    type="text"
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className="shadow-none h-[42px] focus-visible:ring-0 focus-visible:border-black"
                    required
                    placeholder="Votre nom complet"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email <span className="text-destructive">*</span>
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="shadow-none h-[42px] focus-visible:ring-0 focus-visible:border-black"
                    required
                    placeholder="votre.email@exemple.com"
                  />
                </div>

                {/* Téléphone (placeholder) */}
                <div>
                  <label
                    htmlFor="telephone"
                    className="block text-sm font-medium mb-2"
                  >
                    Téléphone
                  </label>
                  <Input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    className="shadow-none h-[42px] focus-visible:ring-0 focus-visible:border-black"
                    placeholder="+33 6 12 34 56 78"
                  />
                </div>

                {/* Entreprise (placeholder) */}
                <div>
                  <label
                    htmlFor="entreprise"
                    className="block text-sm font-medium mb-2"
                  >
                    Entreprise / Organisation
                  </label>
                  <Input
                    type="text"
                    id="entreprise"
                    name="entreprise"
                    value={formData.entreprise}
                    onChange={handleChange}
                    className="shadow-none h-[42px] focus-visible:ring-0 focus-visible:border-black"
                    placeholder="Nom de votre entreprise (optionnel)"
                  />
                </div>

                {/* Question principale */}
                <div>
                  <label
                    htmlFor="question"
                    className="block text-sm font-medium mb-2"
                  >
                    Qu'attendez-vous du Club M ?{" "}
                    <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    id="question"
                    name="question"
                    value={formData.question}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="shadow-none focus-visible:ring-0 focus-visible:border-black resize-none"
                    placeholder="Décrivez vos attentes et motivations pour rejoindre le Club M..."
                  />
                </div>

                {/* Bouton d'envoi */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button asChild className="flex-1 bg-[#f5f5f5] text-black cursor-pointer h-11 hover:bg-[#f8f8f8] shadow-none">
                    <Link href="/devenir-membre">Retour</Link>
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-[#d7f75b] text-black cursor-pointer h-11 shadow-none"
                  >
                    {isSubmitting ? "Envoi en cours..." : "Envoyer"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormMember;
