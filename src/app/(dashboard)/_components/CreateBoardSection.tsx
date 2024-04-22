"use client"
import { SiTask } from "react-icons/si"


export default function CreateBoardSection() {
  return (
    <div className="w-full px-2 cursor-pointer rounded-r-lg flex py-1 items-center gap-2 text-blue-600 hover:text-blue-800">
      <SiTask />
      <p className="text-sm">+ Create New Board</p>
    </div>
  )
}
