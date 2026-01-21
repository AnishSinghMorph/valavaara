import { redirect } from "next/navigation";
import { BOOKING_URL } from "@/data/content";

export default function BookPage() {
    redirect(BOOKING_URL);
}
