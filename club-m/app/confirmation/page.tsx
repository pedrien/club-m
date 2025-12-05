import Header from "@/components/Header";
import Link from "next/link";

export default function Confirmation() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icône de succès */}
          <div className="mb-8 flex justify-center animate-fade-in">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Message principal */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in-delay">
            Merci ! Votre demande a été envoyée.
          </h1>

          {/* Note importante */}
          <div className="bg-card border border-border rounded-lg p-6 mb-8 animate-fade-in-delay">
            <p className="text-lg text-muted-foreground mb-4">
              Votre adhésion sera validée manuellement sous 48h.
            </p>
            <p className="text-base text-muted-foreground">
              Vous recevrez un email de confirmation une fois votre demande
              approuvée.
            </p>
          </div>

          {/* Placeholder pour résumé des informations */}
          <div className="bg-muted/50 border border-border rounded-lg p-6 mb-8 text-left animate-fade-in-delay">
            <h2 className="text-xl font-semibold mb-4">
              Résumé de votre demande
            </h2>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <span className="font-medium">Statut:</span> En attente de
                validation
              </p>
              <p>
                <span className="font-medium">Date de soumission:</span>{" "}
                {new Date().toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p className="pt-2 text-xs italic">
                Les détails complets de votre demande vous ont été envoyés par
                email.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay">
            <Link
              href="/"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Retour à l'accueil
            </Link>
            <Link
              href="/devenir-membre"
              className="px-8 py-3 border border-border rounded-lg hover:bg-muted transition-colors font-medium"
            >
              En savoir plus
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
