import Header from "@/components/Header";
import Link from "next/link";
import Container from "./_layoutHome/container";

export default function Home() {
  return (
        // <div className="min-h-screen flex flex-col">
        //   <Header />

        //   {/* Hero Section */}
        //   <section className="flex-1 relative overflow-hidden">
        //     <div className="container mx-auto px-4 py-16 md:py-24">
        //       <div className="grid md:grid-cols-2 gap-8 items-center">
        //         {/* Image placeholder */}
        //         <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden bg-muted animate-fade-in">
        //           <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
        //             <div className="text-center p-8">
        //               <div className="w-32 h-32 mx-auto mb-4 bg-primary/30 rounded-full flex items-center justify-center">
        //                 <svg
        //                   className="w-16 h-16 text-primary"
        //                   fill="none"
        //                   stroke="currentColor"
        //                   viewBox="0 0 24 24"
        //                 >
        //                   <path
        //                     strokeLinecap="round"
        //                     strokeLinejoin="round"
        //                     strokeWidth={2}
        //                     d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        //                   />
        //                 </svg>
        //               </div>
        //               <p className="text-muted-foreground text-sm">
        //                 Image placeholder
        //                 <br />
        //                 Femmes noires en réunion
        //               </p>
        //             </div>
        //           </div>
        //         </div>

        //         {/* Text content */}
        //         <div className="space-y-6 animate-fade-in-delay">
        //           <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
        //             Bienvenue au Club M
        //           </h1>
        //           <p className="text-lg text-muted-foreground leading-relaxed">
        //             Rejoignez une communauté dynamique de femmes entrepreneures et
        //             professionnelles qui se soutiennent mutuellement dans leur
        //             développement personnel et professionnel. Ensemble, nous créons
        //             des opportunités et construisons l'avenir.
        //           </p>
        //           <p className="text-base text-muted-foreground">
        //             Le Club M est un espace d'échange, de networking et de
        //             croissance pour toutes les femmes qui aspirent à exceller dans
        //             leur domaine.
        //           </p>
        //           <div className="flex flex-col sm:flex-row gap-4 pt-4">
        //             <Link
        //               href="/formulaire-membre"
        //               className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-center"
        //             >
        //               Devenir membre maintenant
        //             </Link>
        //             <Link
        //               href="/devenir-membre"
        //               className="px-8 py-3 border border-border rounded-lg hover:bg-muted transition-colors font-medium text-center"
        //             >
        //               En savoir plus
        //             </Link>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //   </section>
        // </div>
        <Container/>
  );
}
