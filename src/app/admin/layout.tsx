export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Auth enforcement is handled by middleware.ts.
  // This layout just strips the public Navbar/Footer.
  return <div className="min-h-screen bg-[#f8f4f0]">{children}</div>;
}
