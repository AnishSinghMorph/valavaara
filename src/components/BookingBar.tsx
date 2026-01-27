"use client";

import { Ticket } from "lucide-react";
import { motion } from "framer-motion";
import { BOOKING_URL } from "@/data/content";

export function BookingBar() {
    return (
        <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        >
            <div className="p-4 glass border-t border-white/20">
                <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-book w-full animate-pulse-glow"
                >
                    <Ticket size={20} />
                    Book Now on BookMyShow
                </a>
            </div>
        </motion.div>
    );
}

export function FloatingBookButton() {
    return (
        <motion.a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: "spring" }}
            className="!hidden md:!flex fixed bottom-6 right-6 z-50 btn btn-book shadow-xl animate-pulse-glow"
        >
            <Ticket size={20} />
            Book Tickets
        </motion.a>
    );
}
