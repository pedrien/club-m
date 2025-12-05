import Header from "@/components/Header";
import Link from "next/link";

export default function DevenirMembre() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Titre principal */}
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in">
            Pourquoi devenir membre ?
          </h1>

          {/* Section avantages */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Avantage 1 */}
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow animate-fade-in">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-3">
                Réseau professionnel
              </h2>
              <p className="text-muted-foreground">
                Connectez-vous avec des femmes entrepreneures et
                professionnelles partageant les mêmes valeurs et ambitions.
              </p>
            </div>

            {/* Avantage 2 */}
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow animate-fade-in-delay">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-3">
                Développement personnel
              </h2>
              <p className="text-muted-foreground">
                Accédez à des ateliers, formations et événements exclusifs pour
                développer vos compétences et votre leadership.
              </p>
            </div>

            {/* Avantage 3 */}
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow animate-fade-in-delay">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-3">Soutien mutuel</h2>
              <p className="text-muted-foreground">
                Bénéficiez d'un environnement bienveillant où l'entraide et le
                partage d'expériences sont au cœur de notre communauté.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12 animate-fade-in-delay">
            <p className="text-lg text-muted-foreground mb-6">
              Prête à rejoindre notre communauté ?
            </p>
            <Link
              href="/formulaire-membre"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-lg"
            >
              Devenir membre maintenant
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
