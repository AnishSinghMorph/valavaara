import Link from "next/link";
import { BOOKING_URL } from "@/data/content";

export function Footer() {
    return (
        <footer className="bg-foreground text-white py-12 mt-16">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src="/assets/logos/morphWhite.png" 
                                alt="Morph Productions" 
                                className="h-12 w-auto"
                            />
                        </div>
                        <p className="text-foreground-light max-w-sm">
                            A heartwarming tale of friendship between a young boy and his beloved pet cow.
                            Rated U - Perfect for the whole family.
                        </p>
                        <div className="mt-4 flex items-center gap-2">
                            <span className="badge-certified">U Certified</span>
                            <span className="text-sm text-foreground-light">Family Friendly</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold mb-4">Explore</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/watch/trailer" className="text-foreground-light hover:text-white transition-colors">
                                    Watch Trailer
                                </Link>
                            </li>
                            <li>
                                <Link href="/watch/shorts" className="text-foreground-light hover:text-white transition-colors">
                                    Shorts
                                </Link>
                            </li>
                            <li>
                                <Link href="/press-kit" className="text-foreground-light hover:text-white transition-colors">
                                    Press Kit
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Book Now */}
                    <div>
                        <h4 className="font-bold mb-4">Book Tickets</h4>
                        <a
                            href={BOOKING_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-book w-full md:w-auto"
                        >
                            BookMyShow
                        </a>
                        <p className="text-foreground-light text-sm mt-3">
                            Now showing in cinemas near you!
                        </p>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-foreground-light text-sm">
                        © 2026 Valavaara. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-sm text-foreground-light">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
