import type { Metadata } from "next";
import { contacts } from "@/data/portfolio";
import { ContactPreview } from "@/presentation/modules/contact/components/contact-preview";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return <ContactPreview data={contacts} />;
}
