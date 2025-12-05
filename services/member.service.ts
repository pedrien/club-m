import { API_CONFIG } from "@/lib/config";
import {
  transformFormDataToBackend,
  FormData,
} from "@/validators/devenir.membre.validator";

export interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
  data?: unknown;
  details?: string;
}

export const memberService = {
  /**
   * Envoie les données du formulaire au backend
   * @param formData Les données du formulaire
   * @returns La réponse du backend
   */
  async submitMemberForm(formData: FormData): Promise<ApiResponse> {
    try {
      // Transformer les données au format backend
      const backendPayload = transformFormDataToBackend(formData);

      // Log de la requête envoyée
      console.log("📤 [FRONTEND] Envoi de la requête au backend:", {
        url: "/api/v1/members",
        backendUrl: `${API_CONFIG.BASE_URL}members`,
        payload: backendPayload,
        timestamp: new Date().toISOString(),
      });

      const controller = new AbortController();
      const timeoutId = setTimeout(
        () => controller.abort(),
        API_CONFIG.TIMEOUT || 30000
      );

      // Appel à la route Next.js qui fait le proxy vers le backend
      const response = await fetch("/api/v1/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(backendPayload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Log de la réponse reçue
      const contentType = response.headers.get("content-type");
      let responseData: ApiResponse;

      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();
      } else {
        const text = await response.text();
        responseData = {
          success: false,
          error: text || "Erreur inconnue du serveur",
        };
      }

      // Log détaillé de la réponse du backend
      console.log("📥 [BACKEND] Réponse reçue:", {
        status: response.status,
        statusText: response.statusText,
        data: responseData,
        timestamp: new Date().toISOString(),
      });

      // Log spécifique selon le statut
      if (response.ok && responseData.success) {
        console.log(
          "✅ [SUCCESS] Demande d'adhésion enregistrée avec succès:",
          {
            message: responseData.message,
            data: responseData.data,
          }
        );
      } else {
        // Construire un message d'erreur complet
        const errorInfo: Record<string, unknown> = {
          status: response.status,
          statusText: response.statusText,
        };

        // Ajouter les propriétés seulement si elles existent
        if (responseData.error) {
          errorInfo.error = responseData.error;
        }
        if (responseData.details) {
          errorInfo.details = responseData.details;
        }
        if (responseData.message) {
          errorInfo.message = responseData.message;
        }

        // Si aucune propriété d'erreur n'existe, afficher toute la réponse
        if (
          !responseData.error &&
          !responseData.details &&
          !responseData.message
        ) {
          errorInfo.fullResponse = responseData;
        }

        console.error("❌ [ERROR] Erreur du backend:", errorInfo);
      }

      return {
        ...responseData,
        // On garde le statut HTTP pour référence
        _status: response.status,
      } as ApiResponse & { _status: number };
    } catch (error) {
      console.error("🚨 [EXCEPTION] Erreur lors de l'appel au backend:", {
        error: error instanceof Error ? error.message : "Erreur inconnue",
        stack: error instanceof Error ? error.stack : undefined,
        timestamp: new Date().toISOString(),
      });

      if (error instanceof Error && error.name === "AbortError") {
        return {
          success: false,
          error: "Le serveur met trop de temps à répondre. Veuillez réessayer.",
        };
      }

      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Impossible de se connecter au serveur backend",
      };
    }
  },
};
