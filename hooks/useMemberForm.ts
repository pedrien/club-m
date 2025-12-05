import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { memberService } from "@/services/member.service";
import { FormData, transformFormDataToBackend } from "@/validators/devenir.membre.validator";

interface UseMemberFormReturn {
  isSubmitting: boolean;
  errorMessage: string;
  successMessage: string;
  submitForm: (formData: FormData) => Promise<void>;
}

export const useMemberForm = (): UseMemberFormReturn => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const submitForm = useCallback(
    async (formData: FormData) => {
      setIsSubmitting(true);
      setErrorMessage("");
      setSuccessMessage("");

      try {
        console.log("🔄 [HOOK] Début de la soumission du formulaire:", {
          formData,
          timestamp: new Date().toISOString(),
        });

        const response = await memberService.submitMemberForm(formData);

        // Ne pas afficher de message de succès si le backend n'a pas répondu avec succès
        if (response.success && response._status && response._status >= 200 && response._status < 300) {
          setSuccessMessage(response.message || "Votre demande d'adhésion a été enregistrée avec succès");
          
          console.log("✅ [HOOK] Formulaire soumis avec succès, redirection dans 1.5s");
          
          // Rediriger vers la page de confirmation après 1.5 secondes
          setTimeout(() => {
            router.push("/confirmation");
          }, 1500);
        } else {
          // Erreur du backend
          const errorMsg = response.error || "Une erreur est survenue lors de l'enregistrement";
          setErrorMessage(errorMsg);
          setIsSubmitting(false);
          
          console.error("❌ [HOOK] Erreur lors de la soumission:", {
            error: errorMsg,
            response,
          });
        }
      } catch (error) {
        console.error("🚨 [HOOK] Exception lors de la soumission:", error);
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Une erreur est survenue lors de l'envoi du formulaire"
        );
        setIsSubmitting(false);
      }
    },
    [router]
  );

  return {
    isSubmitting,
    errorMessage,
    successMessage,
    submitForm,
  };
};

