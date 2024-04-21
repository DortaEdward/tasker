import DashboardContainer from "./_components/DashboardContainer";
import Sidebar from "./_components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardContainer children={children} />
  );
}