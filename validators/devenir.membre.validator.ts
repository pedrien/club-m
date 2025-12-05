import { z } from "zod";
import {
  ProjectStatusFormValues,
  ProjectStatusMapping,
  ActivityDurationFormValues,
  ActivityDurationMapping,
  BusinessPlanStatusFormValues,
  BusinessPlanStatusMapping,
  EntrepreneurLevelFormValues,
  EntrepreneurLevelMapping,
  HowKnownClubFormValues,
  HowKnownClubMapping,
  AccompanimentTypeFormValues,
  AccompanimentTypeMapping,
} from "@/types/enums/members";

// Types pour le formulaire
export interface FormData {
  // Step 1 - Situation actuelle
  statutProjet: string;
  activitePrincipale: string;
  dureeActivite: string;
  businessPlan: string;
  // Step 2 - Niveau entrepreneuriat
  niveauEntrepreneuriat: string;
  connaissancesGestion: string;
  dejaAccompagnee: string;
  structureAccompagnement: string;
  // Step 3 - Attentes
  besoinsPrioritaires: string[];
  objectifPrincipal: string;
  typeAccompagnement: string;
  structureAccompagnementAttente: string;
  // Step 4 - Infos personnelles
  nom: string;
  prenom: string;
  dateNaissance: string;
  telephone: string;
  email: string;
  villePays: string;
  nomEntreprise: string;
  siteWeb: string;
  connuClubM: string;
  connuClubMDetail: string;
  confirmeInfos: boolean;
  accepteContact: boolean;
}

// Schéma Zod pour l'étape 1
export const step1Schema = z.object({
  statutProjet: z.enum(ProjectStatusFormValues, {
    message: "Le statut du projet est requis",
  }),
  activitePrincipale: z
    .string()
    .min(1, "L'activité principale est requise")
    .trim(),
  dureeActivite: z.enum(ActivityDurationFormValues, {
    message: "La durée d'activité est requise",
  }),
  businessPlan: z.enum(BusinessPlanStatusFormValues, {
    message: "La réponse concernant le business plan est requise",
  }),
});

// Schéma Zod pour l'étape 2
export const step2Schema = z
  .object({
    niveauEntrepreneuriat: z.enum(EntrepreneurLevelFormValues, {
      message: "Le niveau d'entrepreneuriat est requis",
    }),
    connaissancesGestion: z
      .string()
      .min(1, "L'évaluation de vos connaissances est requise")
      .refine(
        (val) => {
          const num = parseInt(val);
          return !isNaN(num) && num >= 1 && num <= 5;
        },
        { message: "Veuillez entrer un nombre entre 1 et 5" }
      ),
    dejaAccompagnee: z.string().min(1, "La réponse est requise"),
    structureAccompagnement: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.dejaAccompagnee === "Oui") {
        return (
          data.structureAccompagnement &&
          data.structureAccompagnement.trim() !== ""
        );
      }
      return true;
    },
    {
      message: "Veuillez préciser la structure d'accompagnement",
      path: ["structureAccompagnement"],
    }
  );

// Schéma Zod pour l'étape 3
export const step3Schema = z.object({
  besoinsPrioritaires: z
    .array(z.string())
    .min(1, "Veuillez sélectionner au moins un besoin prioritaire"),
  objectifPrincipal: z
    .string()
    .min(10, "L'objectif principal doit contenir au moins 10 caractères")
    .max(500, "L'objectif principal ne peut pas dépasser 500 caractères")
    .trim(),
  typeAccompagnement: z.enum(AccompanimentTypeFormValues, {
    message: "Le type d'accompagnement est requis",
  }),
  structureAccompagnementAttente: z.string().optional(),
});

// Schéma Zod pour l'étape 4
export const step4Schema = z.object({
  nom: z.string().min(1, "Le nom est requis").trim(),
  prenom: z.string().min(1, "Le prénom est requis").trim(),
  dateNaissance: z
    .string()
    .min(1, "La date de naissance est requise")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "La date doit être au format YYYY-MM-DD"),
  telephone: z.string().min(1, "Le numéro de téléphone est requis").trim(),
  email: z
    .string()
    .email("Format d'email invalide")
    .min(1, "L'adresse email est requise"),
  villePays: z.string().min(1, "La ville et le pays sont requis").trim(),
  nomEntreprise: z.string().optional(),
  siteWeb: z.string().optional(),
  connuClubM: z.enum(HowKnownClubFormValues, {
    message: "Veuillez indiquer comment vous avez connu le Club M",
  }),
  connuClubMDetail: z.string().optional(),
  confirmeInfos: z.boolean().refine((val) => val === true, {
    message: "Vous devez confirmer que les informations sont exactes",
  }),
  accepteContact: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter d'être contactée",
  }),
});

// Schéma Zod complet pour toutes les étapes
export const fullFormSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema);

// Erreurs de validation
export interface ValidationErrors {
  [key: string]: string;
}

// Validation pour l'étape 1 avec Zod
export const validateStep1 = (formData: FormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  try {
    step1Schema.parse({
      statutProjet: formData.statutProjet,
      activitePrincipale: formData.activitePrincipale,
      dureeActivite: formData.dureeActivite,
      businessPlan: formData.businessPlan,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.issues.forEach((err: z.ZodIssue) => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message;
        }
      });
    }
  }

  return errors;
};

// Validation pour l'étape 2 avec Zod
export const validateStep2 = (formData: FormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  try {
    step2Schema.parse({
      niveauEntrepreneuriat: formData.niveauEntrepreneuriat,
      connaissancesGestion: formData.connaissancesGestion,
      dejaAccompagnee: formData.dejaAccompagnee,
      structureAccompagnement: formData.structureAccompagnement,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.issues.forEach((err: z.ZodIssue) => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message;
        }
      });
    }
  }

  return errors;
};

// Validation pour l'étape 3 avec Zod
export const validateStep3 = (formData: FormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  try {
    step3Schema.parse({
      besoinsPrioritaires: formData.besoinsPrioritaires,
      objectifPrincipal: formData.objectifPrincipal,
      typeAccompagnement: formData.typeAccompagnement,
      structureAccompagnementAttente: formData.structureAccompagnementAttente,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.issues.forEach((err: z.ZodIssue) => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message;
        }
      });
    }
  }

  return errors;
};

// Validation pour l'étape 4 avec Zod
export const validateStep4 = (formData: FormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  try {
    step4Schema.parse({
      nom: formData.nom,
      prenom: formData.prenom,
      dateNaissance: formData.dateNaissance,
      telephone: formData.telephone,
      email: formData.email,
      villePays: formData.villePays,
      nomEntreprise: formData.nomEntreprise,
      siteWeb: formData.siteWeb,
      connuClubM: formData.connuClubM,
      connuClubMDetail: formData.connuClubMDetail,
      confirmeInfos: formData.confirmeInfos,
      accepteContact: formData.accepteContact,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.issues.forEach((err: z.ZodIssue) => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message;
        }
      });
    }
  }

  return errors;
};

// Fonction pour vérifier si une étape est valide
export const isStepValid = (step: number, formData: FormData): boolean => {
  let errors: ValidationErrors = {};

  switch (step) {
    case 1:
      errors = validateStep1(formData);
      break;
    case 2:
      errors = validateStep2(formData);
      break;
    case 3:
      errors = validateStep3(formData);
      break;
    case 4:
      errors = validateStep4(formData);
      break;
    default:
      return false;
  }

  return Object.keys(errors).length === 0;
};

// Fonction pour transformer les données du formulaire en format backend
export const transformFormDataToBackend = (formData: FormData) => {
  return {
    project_status:
      ProjectStatusMapping[formData.statutProjet] || formData.statutProjet,
    current_activity: formData.activitePrincipale,
    activity_duration:
      ActivityDurationMapping[formData.dureeActivite] || formData.dureeActivite,
    business_plan_status:
      BusinessPlanStatusMapping[formData.businessPlan] || formData.businessPlan,
    entrepreneur_level:
      EntrepreneurLevelMapping[formData.niveauEntrepreneuriat] ||
      formData.niveauEntrepreneuriat,
    management_knowledge: parseInt(formData.connaissancesGestion) || 0,
    already_accompanied: formData.dejaAccompagnee === "Oui",
    accompaniment_structure: formData.structureAccompagnement || "",
    priority_needs: formData.besoinsPrioritaires || [],
    main_objective_12months: formData.objectifPrincipal,
    preferred_accompaniment_type:
      AccompanimentTypeMapping[formData.typeAccompagnement] ||
      formData.typeAccompagnement,
    name: formData.nom,
    first_name: formData.prenom,
    email: formData.email,
    telephone: formData.telephone,
    date_of_birth: formData.dateNaissance,
    city_country: formData.villePays,
    company_name: formData.nomEntreprise || "",
    website_social: formData.siteWeb || "",
    how_known_club:
      HowKnownClubMapping[formData.connuClubM] || formData.connuClubM,
    consent_accurate_info: formData.confirmeInfos,
    consent_contact: formData.accepteContact,
  };
};
