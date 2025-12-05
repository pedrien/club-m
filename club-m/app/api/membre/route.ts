import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nom, email, question, ...autresChamps } = body;

    // Validation basique
    if (!nom || !email) {
      return NextResponse.json(
        { success: false, error: "Le nom et l'email sont requis" },
        { status: 400 }
      );
    }

    // Validation email basique
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Format d'email invalide" },
        { status: 400 }
      );
    }

    // Ici, on pourrait sauvegarder dans une base de données
    // Pour le prototype, on simule juste une sauvegarde réussie
    console.log("Nouvelle demande d'adhésion:", {
      nom,
      email,
      question,
      autresChamps,
      date: new Date().toISOString(),
    });

    // Retourner une réponse de succès
    return NextResponse.json(
      {
        success: true,
        message: "Votre demande a été envoyée avec succès",
        data: {
          nom,
          email,
          question,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors du traitement de la demande:", error);
    return NextResponse.json(
      { success: false, error: "Une erreur est survenue lors de l'envoi" },
      { status: 500 }
    );
  }
}
