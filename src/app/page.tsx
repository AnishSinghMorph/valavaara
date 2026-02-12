import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden">
      {/* Full-screen poster background - Mobile */}
      <Image
        src="/assets/images/Mob Preview.png"
        alt="Valavaara Movie Poster"
        fill
        className="object-contain md:hidden"
        priority
        quality={100}
      />
      
      {/* Full-screen poster background - Desktop */}
      <Image
        src="/assets/images/Web Preview.png"
        alt="Valavaara Movie Poster"
        fill
        className="object-cover hidden md:block"
        priority
        quality={100}
      />
      
      {/* Dark overlay for better button visibility */}
      <div className="absolute inset-0 bg-black/30" />
      
      {/* Centered button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Link 
          href="/main"
          className="btn btn-primary inline-flex items-center gap-2 text-lg px-8 py-4 shadow-2xl hover:scale-110 transition-transform"
        >
          Explore Valavaara Movie
          <ArrowRight size={24} />
        </Link>
      </div>
    </div>
  );
}
