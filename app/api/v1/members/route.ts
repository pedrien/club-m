import { NextRequest, NextResponse } from "next/server";
import { API_CONFIG } from "@/lib/config";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation basique côté client avant d'envoyer au backend
    const { name, first_name, email, consent_accurate_info, consent_contact } =
      body;

    if (!name || !first_name || !email) {
      return NextResponse.json(
        {
          success: false,
          error: "Les champs name, first_name et email sont requis",
        },
        { status: 400 }
      );
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Format d'email invalide" },
        { status: 400 }
      );
    }

    // Validation des consentements
    if (!consent_accurate_info || !consent_contact) {
      return NextResponse.json(
        {
          success: false,
          error: "Les consentements sont requis",
        },
        { status: 400 }
      );
    }

    // Log des données reçues (pour le développement)
    // Construire l'URL du backend (éviter les doubles slashes)
    const baseUrl = API_CONFIG.BASE_URL?.endsWith("/")
      ? API_CONFIG.BASE_URL.slice(0, -1)
      : API_CONFIG.BASE_URL;
    const backendUrl = `${baseUrl}/members`;

    console.log("📤 [API ROUTE] Envoi de la demande au backend:", {
      url: backendUrl,
      name,
      first_name,
      email,
      date: new Date().toISOString(),
    });

    // Appel au backend réel
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    try {
      const backendResponse = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Récupérer la réponse du backend
      let backendData;
      const contentType = backendResponse.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        backendData = await backendResponse.json();
      } else {
        // Si la réponse n'est pas JSON, récupérer le texte
        const text = await backendResponse.text();
        backendData = {
          success: false,
          error: text || "Erreur inconnue du serveur",
        };
      }

      // Log de la réponse du backend dans la console serveur
      console.log("📥 [API ROUTE] Réponse du backend reçue:", {
        status: backendResponse.status,
        statusText: backendResponse.statusText,
        data: backendData,
        timestamp: new Date().toISOString(),
      });

      // Log d'erreur si le backend a retourné une erreur
      // Considérer un succès si le statut est 200-299, même sans propriété success
      const isSuccess =
        backendResponse.ok ||
        (backendResponse.status >= 200 && backendResponse.status < 300);

      if (
        !isSuccess ||
        (backendData &&
          typeof backendData === "object" &&
          "error" in backendData &&
          backendData.error)
      ) {
        const errorInfo: Record<string, unknown> = {
          status: backendResponse.status,
          statusText: backendResponse.statusText,
          url: backendUrl,
        };

        if (backendData && typeof backendData === "object") {
          if ("error" in backendData && backendData.error) {
            errorInfo.error = backendData.error;
          }
          if ("details" in backendData && backendData.details) {
            errorInfo.details = backendData.details;
          }
          if ("message" in backendData && backendData.message) {
            errorInfo.message = backendData.message;
          }

          // Afficher les erreurs de validation détaillées si elles existent
          if ("errors" in backendData && backendData.errors) {
            errorInfo.validationErrors = backendData.errors;
            console.error("❌ [API ROUTE] Erreurs de validation détaillées:", {
              errors: backendData.errors,
            });
          }

          // Si aucune propriété d'erreur standard, afficher toute la réponse
          if (!("error" in backendData) && !("details" in backendData)) {
            errorInfo.fullResponse = backendData;
          }
        } else {
          errorInfo.rawResponse = backendData;
        }

        console.error("❌ [API ROUTE] Erreur du backend:", errorInfo);
      }

      // Retourner la réponse du backend avec le même statut
      return NextResponse.json(backendData, {
        status: backendResponse.status,
      });
    } catch (fetchError: unknown) {
      clearTimeout(timeoutId);

      if (fetchError instanceof Error && fetchError.name === "AbortError") {
        console.error("Timeout lors de l'appel au backend");
        return NextResponse.json(
          {
            success: false,
            error:
              "Le serveur met trop de temps à répondre. Veuillez réessayer.",
          },
          { status: 504 }
        );
      }

      // Erreur de connexion au backend
      console.error("Erreur de connexion au backend:", fetchError);
      return NextResponse.json(
        {
          success: false,
          error: "Impossible de se connecter au serveur backend",
          details:
            fetchError instanceof Error
              ? fetchError.message
              : "Erreur de connexion",
        },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error("Erreur lors du traitement de la demande:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          "Une erreur est survenue lors de l'enregistrement de votre demande",
        details: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}
