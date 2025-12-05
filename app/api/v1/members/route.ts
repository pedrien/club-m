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
    console.log("Envoi de la demande au backend:", {
      url: `${API_CONFIG.BASE_URL}/api/v1/members`,
      name,
      first_name,
      email,
      date: new Date().toISOString(),
    });

    // Appel au backend réel
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    try {
      const backendResponse = await fetch(`${API_CONFIG.BASE_URL}members`, {
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
