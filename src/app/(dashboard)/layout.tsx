import DashboardContainer from "./_components/DashboardContainer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardContainer children={children} />
  );
}
