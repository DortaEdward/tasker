"use client"
import { useState } from "react"
import { Board } from "@prisma/client"
import Sidebar from "./Sidebar"
import CreateBoardModal from "./CreateBoardModal"

type Props = {
  children: React.ReactNode
  boards: Board[]
}
/*
*/

export default function Temp({ children, boards }: Props) {
  const [toggleCreateList, setToggleCreateList] = useState<boolean>(false);
  const [toggleCreateBoard, setToggleCreateBoard] = useState<boolean>(false);
  return (
    <>
      <Sidebar boards={boards} setToggleCreateBoard={setToggleCreateBoard} />
      <div className="flex-1 flex flex-col">
        <header className="w-full h-20 border">Outline</header>
        <div className="flex-1 border">
          {children}
        </div>
      </div>
      <CreateBoardModal toggleCreateBoard={toggleCreateBoard} setToggleCreateBoard={setToggleCreateBoard} />
    </>
  )
}
