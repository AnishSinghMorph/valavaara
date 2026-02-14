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
        className="object-cover object-top md:hidden"
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
      <div className="absolute inset-0 bg-black/30 z-10" />
      
      {/* Button positioned at bottom */}
      <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center px-4 z-20">
        <Link 
          href="/main"
          className="inline-flex items-center gap-2 text-base px-6 py-3 shadow-2xl hover:scale-110 transition-transform bg-white/10 backdrop-blur-md border-2 border-primary text-white rounded-lg font-semibold"
        >
          Explore Valavaara Movie
          <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
}
