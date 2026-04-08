import { redirect } from "next/navigation";

// /services has been replaced by /systems
// Permanent redirect to preserve any existing bookmarks/links
export default function ServicesPage() {
  redirect("/systems");
}
