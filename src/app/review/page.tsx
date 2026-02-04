import { Metadata } from "next";
import ReviewPageClient from "./ReviewPageClient";

export const metadata: Metadata = {
  title: "Reviews | Valavaara",
  description: "Watch what people are saying about Valavaara on social media",
};

export default function ReviewPage() {
  return <ReviewPageClient />;
}
