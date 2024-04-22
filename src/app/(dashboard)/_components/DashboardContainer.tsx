import { auth } from "@clerk/nextjs/server";
import Wrapper from "./Wrapper";
import { getBoards } from "@/server/queries/queries";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode
}

export default async function DashboardContainer({ children }: Props) {

  const { userId } = auth()
  if (!userId) redirect("/")
  const boards = await getBoards(userId)

  return (
    <div className="min-w-screen min-h-screen bg-slate-800 flex relative">
      <Wrapper children={children} boards={boards} />
    </div>
  )
}


