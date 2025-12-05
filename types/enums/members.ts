// Enums pour le statut du projet
export enum ProjectStatus {
  BUSINESS_EN_ACTIVITE = "business_en_activite",
  EN_COURS_CREATION = "en_cours_creation",
  IDEE_SANS_DIRECTION = "idee_sans_direction",
  BESOIN_CLARIFICATION = "besoin_clarification",
}

// Valeurs des enums pour Zod
export const ProjectStatusValues = [
  ProjectStatus.BUSINESS_EN_ACTIVITE,
  ProjectStatus.EN_COURS_CREATION,
  ProjectStatus.IDEE_SANS_DIRECTION,
  ProjectStatus.BESOIN_CLARIFICATION,
] as const;

// Mapping des valeurs françaises du formulaire vers les enums
export const ProjectStatusMapping: Record<string, ProjectStatus> = {
  "J'ai déjà un business en activité": ProjectStatus.BUSINESS_EN_ACTIVITE,
  "Je suis en cours de création": ProjectStatus.EN_COURS_CREATION,
  "J'ai une idée mais je ne sais pas par où commencer":
    ProjectStatus.IDEE_SANS_DIRECTION,
  "Je souhaite être accompagnée pour clarifier mon projet":
    ProjectStatus.BESOIN_CLARIFICATION,
};

// Valeurs françaises acceptées dans le formulaire
export const ProjectStatusFormValues = [
  "J'ai déjà un business en activité",
  "Je suis en cours de création",
  "J'ai une idée mais je ne sais pas par où commencer",
  "Je souhaite être accompagnée pour clarifier mon projet",
] as const;

// Enums pour la durée d'activité
export enum ActivityDuration {
  MOINS_6_MOIS = "moins_6_mois",
  SIX_MOIS_2_ANS = "6_mois_2_ans",
  PLUS_2_ANS = "plus_2_ans",
}

// Valeurs des enums pour Zod
export const ActivityDurationValues = [
  ActivityDuration.MOINS_6_MOIS,
  ActivityDuration.SIX_MOIS_2_ANS,
  ActivityDuration.PLUS_2_ANS,
] as const;

// Mapping des valeurs françaises du formulaire vers les enums
export const ActivityDurationMapping: Record<string, ActivityDuration> = {
  "Moins de 6 mois": ActivityDuration.MOINS_6_MOIS,
  "Entre 6 mois et 2 ans": ActivityDuration.SIX_MOIS_2_ANS,
  "Plus de 2 ans": ActivityDuration.PLUS_2_ANS,
};

// Valeurs françaises acceptées dans le formulaire
export const ActivityDurationFormValues = [
  "Moins de 6 mois",
  "Entre 6 mois et 2 ans",
  "Plus de 2 ans",
] as const;

// Enums pour le statut du business plan
export enum BusinessPlanStatus {
  OUI_STRUCTURE = "oui_structure",
  OUI_A_RETRAVAILLER = "oui_a_retravailler",
  NON = "non",
}

// Valeurs des enums pour Zod
export const BusinessPlanStatusValues = [
  BusinessPlanStatus.OUI_STRUCTURE,
  BusinessPlanStatus.OUI_A_RETRAVAILLER,
  BusinessPlanStatus.NON,
] as const;

// Mapping des valeurs françaises du formulaire vers les enums
export const BusinessPlanStatusMapping: Record<string, BusinessPlanStatus> = {
  "Oui, structuré et à jour": BusinessPlanStatus.OUI_STRUCTURE,
  "Oui, mais à retravailler": BusinessPlanStatus.OUI_A_RETRAVAILLER,
  "Non, pas encore": BusinessPlanStatus.NON,
};

// Valeurs françaises acceptées dans le formulaire
export const BusinessPlanStatusFormValues = [
  "Oui, structuré et à jour",
  "Oui, mais à retravailler",
  "Non, pas encore",
] as const;

// Enums pour le niveau d'entrepreneuriat
export enum EntrepreneurLevel {
  NIVEAU_1 = "niveau_1",
  NIVEAU_2 = "niveau_2",
  NIVEAU_3 = "niveau_3",
  NIVEAU_4 = "niveau_4",
}

// Valeurs des enums pour Zod
export const EntrepreneurLevelValues = [
  EntrepreneurLevel.NIVEAU_1,
  EntrepreneurLevel.NIVEAU_2,
  EntrepreneurLevel.NIVEAU_3,
  EntrepreneurLevel.NIVEAU_4,
] as const;

// Mapping des valeurs françaises du formulaire vers les enums
export const EntrepreneurLevelMapping: Record<string, EntrepreneurLevel> = {
  Débutante: EntrepreneurLevel.NIVEAU_1,
  "En lancement": EntrepreneurLevel.NIVEAU_2,
  "En croissance": EntrepreneurLevel.NIVEAU_3,
  "Ambition scale / expansion": EntrepreneurLevel.NIVEAU_4,
};

// Valeurs françaises acceptées dans le formulaire
export const EntrepreneurLevelFormValues = [
  "Débutante",
  "En lancement",
  "En croissance",
  "Ambition scale / expansion",
] as const;

// Enums pour comment le club a été connu
export enum HowKnownClub {
  RESEAUX_SOCIAUX = "reseaux_sociaux",
  RECOMMANDATION_AMIE = "recommandation_amie",
  EVENEMENT_ATELIER = "evenement_atelier",
  PARTENAIRE = "partenaire",
  AUTRE = "autre",
}

// Valeurs des enums pour Zod
export const HowKnownClubValues = [
  HowKnownClub.RESEAUX_SOCIAUX,
  HowKnownClub.RECOMMANDATION_AMIE,
  HowKnownClub.EVENEMENT_ATELIER,
  HowKnownClub.PARTENAIRE,
  HowKnownClub.AUTRE,
] as const;

// Mapping des valeurs françaises du formulaire vers les enums
export const HowKnownClubMapping: Record<string, HowKnownClub> = {
  "Réseaux sociaux": HowKnownClub.RESEAUX_SOCIAUX,
  "Recommandation d'une amie": HowKnownClub.RECOMMANDATION_AMIE,
  "Événement / atelier": HowKnownClub.EVENEMENT_ATELIER,
  "Partenaire (banque, ONG, etc.)": HowKnownClub.PARTENAIRE,
  Autre: HowKnownClub.AUTRE,
};

// Valeurs françaises acceptées dans le formulaire
export const HowKnownClubFormValues = [
  "Réseaux sociaux",
  "Recommandation d'une amie",
  "Événement / atelier",
  "Partenaire (banque, ONG, etc.)",
  "Autre",
] as const;

// Enums pour le type d'accompagnement
export enum AccompanimentType {
  INDIVIDUEL = "individuel",
  GROUPE = "groupe",
  LES_DEUX = "les_deux",
}

// Valeurs des enums pour Zod
export const AccompanimentTypeValues = [
  AccompanimentType.INDIVIDUEL,
  AccompanimentType.GROUPE,
  AccompanimentType.LES_DEUX,
] as const;

// Mapping des valeurs françaises du formulaire vers les enums
export const AccompanimentTypeMapping: Record<string, AccompanimentType> = {
  "Accompagnement individuel (coaching personnalisé)":
    AccompanimentType.INDIVIDUEL,
  "Accompagnement en groupe (ateliers, masterclass)": AccompanimentType.GROUPE,
  "Les deux": AccompanimentType.LES_DEUX,
};

// Valeurs françaises acceptées dans le formulaire
export const AccompanimentTypeFormValues = [
  "Accompagnement individuel (coaching personnalisé)",
  "Accompagnement en groupe (ateliers, masterclass)",
  "Les deux",
] as const;
