import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b border-border bg-background">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo placeholder */}
        <Link href="/" className="flex items-center">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">
              CM
            </span>
          </div>
          <span className="ml-3 text-xl font-semibold">Club M</span>
        </Link>

        {/* Navigation menu */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-foreground hover:text-primary transition-colors"
          >
            Accueil
          </Link>
          <Link
            href="/devenir-membre"
            className="text-foreground hover:text-primary transition-colors"
          >
            Devenir membre
          </Link>
        </nav>

        {/* CTA Button */}
        <Link
          href="/formulaire-membre"
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          Devenir membre
        </Link>
      </div>
    </header>
  );
}
