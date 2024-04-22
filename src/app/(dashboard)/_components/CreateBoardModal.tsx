"use client"
import React, { Dispatch, FormEventHandler, SetStateAction, useState } from "react"
import { MdClose } from "react-icons/md";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { createBoard } from "../_serverActions";

type Props = {
  toggleCreateBoard: boolean
  setToggleCreateBoard: Dispatch<SetStateAction<boolean>>;
}

export default function CreateBoardModal({ toggleCreateBoard, setToggleCreateBoard }: Props) {
  const [boardTitle, setBoardTitle] = useState<string>("")
  const { userId } = useAuth()
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const boardId = await createBoard(boardTitle, userId!)
    if (boardId) {
      router.refresh()
    }


  }

  return (
    <div className={`w-full h-full bg-black/40 absolute top-0 left-0 ${toggleCreateBoard ? "flex" : "hidden"} items-center justify-center`}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-slate-800 z-10 p-6 rounded-lg w-80 flex flex-col gap-2 text-white relative">
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">Add New Board</p>
          <MdClose
            className="cursor-pointer"
            size={24}
            onClick={() => setToggleCreateBoard(false)}
          />
        </div>
        <fieldset className="flex flex-col">
          <input
            name="name"
            value={boardTitle}
            onChange={(e) => setBoardTitle(e.target.value)}
            placeholder="Enter Board Title"
            className="bg-transparent border border-gray-400 px-3 py-1 rounded text-sm"
          />
        </fieldset>
        <button type="submit" className="bg-indigo-500 text-white text-xs py-2 rounded-2xl">Create Board</button>
      </form>
    </div>
  )
}
