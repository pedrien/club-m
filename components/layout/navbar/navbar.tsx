import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <header className="w-full border-b border-border bg-background">
      <nav>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo placeholder */}
        <Link href="/" className="flex items-center">
          <Image src="/logos/logo1.png" alt="Club M" width={100} height={100} />
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
      </nav>
    </header>
  );
};

export default Navbar;
