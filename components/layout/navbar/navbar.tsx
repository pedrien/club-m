import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="w-full fixed top-0 left-0 w-full z-50">
      <nav>
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex justify-between w-full">
            <div className="flex items-center bg-black/40 rounded-xl p-3 px-5 backdrop-blur-[10px]">
              <Link href="/" className="flex items-center mr-10">
                <Image
                  src="/logos/logo1.png"
                  alt="Club M"
                  width={60}
                  height={0}
                  layout="responsive"
                  className="w-[60px!important]"
                />
              </Link>
              <div className="hidden md:flex items-center gap-8">
                <Link
                  href="/"
                  className="text-white hover:text-primary transition-colors"
                >
                  Accueil
                </Link>
                <Link
                  href="/"
                  className="text-white hover:text-primary transition-colors"
                >
                  A propos
                </Link>
                <Link
                  href="/"
                  className="text-white hover:text-primary transition-colors"
                >
                  Services
                </Link>
                <Link
                  href="/"
                  className="text-white hover:text-primary transition-colors"
                >
                  Evenements
                </Link>
                <Link
                  href="/"
                  className="text-white hover:text-primary transition-colors"
                >
                  Blog
                </Link>
                <Link
                  href="/"
                  className="text-white hover:text-primary transition-colors"
                >
                  Contact
                </Link>
                {/* <Link
                  href="/devenir-membre"
                  className="text-white hover:text-primary transition-colors"
                >
                  Devenir membre
                </Link> */}
              </div>
            </div>
            <div className="flex items-center gap-4">
            <Button
              className="px-6 py-2 inline-flex h-full items-center justify-center bg-black/40 backdrop-blur-[10px] text-white rounded-xl hover:bg-[#d7f75b]/80 hover:text-black transition-colors font-medium shadow-none"
            >
              <div className="icon">
                <Search className="w-[30px!important] h-[30px!important]" />
              </div>
            </Button>
            <Link
              href="/formulaire-membre"
              className="px-6 py-2 inline-flex h-full items-center justify-center bg-[#d7f75b] text-black rounded-xl hover:bg-[#d7f75b]/80 hover:text-black transition-colors font-medium"
            >
              Devenir membre
            </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
