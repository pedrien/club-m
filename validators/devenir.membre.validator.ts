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

// Erreurs de validation
export interface ValidationErrors {
  [key: string]: string;
}

// Validation pour l'étape 1
export const validateStep1 = (formData: FormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!formData.statutProjet) {
    errors.statutProjet = "Le statut du projet est requis";
  }

  if (
    !formData.activitePrincipale ||
    formData.activitePrincipale.trim() === ""
  ) {
    errors.activitePrincipale = "L'activité principale est requise";
  }

  if (!formData.dureeActivite) {
    errors.dureeActivite = "La durée d'activité est requise";
  }

  if (!formData.businessPlan) {
    errors.businessPlan = "La réponse concernant le business plan est requise";
  }

  return errors;
};

// Validation pour l'étape 2
export const validateStep2 = (formData: FormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!formData.niveauEntrepreneuriat) {
    errors.niveauEntrepreneuriat = "Le niveau d'entrepreneuriat est requis";
  }

  if (
    !formData.connaissancesGestion ||
    formData.connaissancesGestion.trim() === ""
  ) {
    errors.connaissancesGestion =
      "L'évaluation de vos connaissances est requise";
  }

  // Validation du nombre entre 1 et 5
  const connaissanceNum = parseInt(formData.connaissancesGestion);
  if (isNaN(connaissanceNum) || connaissanceNum < 1 || connaissanceNum > 5) {
    errors.connaissancesGestion = "Veuillez entrer un nombre entre 1 et 5";
  }

  if (!formData.dejaAccompagnee) {
    errors.dejaAccompagnee = "La réponse est requise";
  }

  if (
    formData.dejaAccompagnee === "Oui" &&
    (!formData.structureAccompagnement ||
      formData.structureAccompagnement.trim() === "")
  ) {
    errors.structureAccompagnement =
      "Veuillez préciser la structure d'accompagnement";
  }

  return errors;
};

// Validation pour l'étape 3
export const validateStep3 = (formData: FormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (
    !formData.besoinsPrioritaires ||
    formData.besoinsPrioritaires.length === 0
  ) {
    errors.besoinsPrioritaires =
      "Veuillez sélectionner au moins un besoin prioritaire";
  }

  if (!formData.objectifPrincipal || formData.objectifPrincipal.trim() === "") {
    errors.objectifPrincipal = "L'objectif principal est requis";
  }

  if (!formData.typeAccompagnement) {
    errors.typeAccompagnement = "Le type d'accompagnement est requis";
  }

  return errors;
};

// Validation pour l'étape 4
export const validateStep4 = (formData: FormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!formData.nom || formData.nom.trim() === "") {
    errors.nom = "Le nom est requis";
  }

  if (!formData.prenom || formData.prenom.trim() === "") {
    errors.prenom = "Le prénom est requis";
  }

  if (!formData.dateNaissance) {
    errors.dateNaissance = "La date de naissance est requise";
  }

  if (!formData.telephone || formData.telephone.trim() === "") {
    errors.telephone = "Le numéro de téléphone est requis";
  }

  if (!formData.email || formData.email.trim() === "") {
    errors.email = "L'adresse email est requise";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Format d'email invalide";
    }
  }

  if (!formData.villePays || formData.villePays.trim() === "") {
    errors.villePays = "La ville et le pays sont requis";
  }

  if (!formData.connuClubM) {
    errors.connuClubM = "Veuillez indiquer comment vous avez connu le Club M";
  }

  if (!formData.confirmeInfos) {
    errors.confirmeInfos =
      "Vous devez confirmer que les informations sont exactes";
  }

  if (!formData.accepteContact) {
    errors.accepteContact = "Vous devez accepter d'être contactée";
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
    project_status: formData.statutProjet,
    current_activity: formData.activitePrincipale,
    activity_duration: formData.dureeActivite,
    business_plan_status: formData.businessPlan,
    entrepreneur_level: formData.niveauEntrepreneuriat,
    management_knowledge: parseInt(formData.connaissancesGestion) || 0,
    already_accompanied: formData.dejaAccompagnee === "Oui",
    accompaniment_structure: formData.structureAccompagnement || "",
    priority_needs: formData.besoinsPrioritaires || [],
    main_objective_12months: formData.objectifPrincipal,
    preferred_accompaniment_type: formData.typeAccompagnement,
    name: formData.nom,
    first_name: formData.prenom,
    email: formData.email,
    telephone: formData.telephone,
    date_of_birth: formData.dateNaissance,
    city_country: formData.villePays,
    company_name: formData.nomEntreprise || "",
    website_social: formData.siteWeb || "",
    how_known_club: formData.connuClubM,
    consent_accurate_info: formData.confirmeInfos,
    consent_contact: formData.accepteContact,
  };
};
