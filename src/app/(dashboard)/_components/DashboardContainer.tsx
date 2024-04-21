"use client"
import { useState } from "react"
import Sidebar from "./Sidebar"
import CreateListModal from "./CreateListModal"

export default function DashboardContainer({ children }: { children: React.ReactNode }) {
  const [toggleCreateList, setToggleCreateList] = useState<boolean>(false);
  const [toggleCreateBoard, setToggleCreateBoard] = useState<boolean>(false);
  return (
    <div className="min-w-screen min-h-screen bg-slate-800 flex relative">
      <Sidebar setToggleCreateBoard={setToggleCreateList} />
      <div className="flex-1 flex flex-col">
        <header className="w-full h-20 border">Outline</header>
        <div className="flex-1 border">
          {children}
        </div>
      </div>
      <CreateListModal toggleCreateList={toggleCreateList} setToggleCreateList={setToggleCreateList} />
    </div>
  )
}
