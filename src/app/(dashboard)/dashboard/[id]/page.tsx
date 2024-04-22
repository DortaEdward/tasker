import { findBoardById } from "@/server/queries/queries"
import Header from "../../_components/Header"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function BoardPage({ params }: { params: { id: string } }) {
  const { userId } = auth()
  if (!params || !userId) {
    redirect("/dashboard")
  }
  const board = await findBoardById(Number(params.id), userId)
  if (!board) {
    redirect("/dashboard")
  }

  const lists = [{ id: 4, title: "List for the first", description: "dsfsdfkjaflaskj" }]

  return (
    <div className="w-full h-full text-white">
      <Header board={board} />
      <div className="flex flex-1 overflow-y-auto h-[calc(100vh-80px)] overflow-x-auto px-4 gap-4 h-full ">
        {
          board.lists &&
          board.lists.map((list) => {
            return (
              <div>{list.title}</div>
            )
          })
        }
        <div className="w-64 rounded-md h-[calc(100vh-100px)] bg-slate-700 flex items-center justify-center cursor-pointer">
          <p className="text-2xl">+ New List</p>
        </div>
      </div>
    </div>
  )
}
