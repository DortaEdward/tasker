import Navbar from "../_components/Navbar";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-screen min-h-screen bg-slate-800 flex flex-col">
      <Navbar />
      {children}
    </div>
  );
}