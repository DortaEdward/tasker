import Temp from "./Temp";
import { getBoards } from "@/server/queries/queries";

type Props = {
  children: React.ReactNode
}

export default async function DashboardContainer({ children }: Props) {

  // get boards
  const boards = await getBoards()

  return (
    <div className="min-w-screen min-h-screen bg-slate-800 flex relative">
      <Temp children={children} boards={boards} />
    </div>
  )
}


