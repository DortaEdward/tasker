import { Board } from "@prisma/client"
import { MdMoreVert } from "react-icons/md";

type Props = {
  board: Board
}
export default function Header({ board }: Props) {
  return (
    <header className="w-full h-20 flex items-center justify-between px-10 text-white">
      <p className="text-2xl font-semibold">{board.title}</p>
      <div className="flex items-center gap-1">
        <button className="bg-teal-600 font-medium text-white px-4 py-1 rounded-2xl">+ Create Task</button>
        <MdMoreVert size={24} />
      </div>
    </header>
  )
}
