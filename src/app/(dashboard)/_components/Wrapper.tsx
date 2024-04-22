"use client"
import { useState } from "react"
import { Board } from "@prisma/client"
import Sidebar from "./Sidebar"
import CreateBoardModal from "./CreateBoardModal"

type Props = {
  children: React.ReactNode
  boards: Board[]
}

export default function Wrapper({ children, boards }: Props) {
  const [toggleCreateList, setToggleCreateList] = useState<boolean>(false);
  const [toggleCreateBoard, setToggleCreateBoard] = useState<boolean>(false);
  return (
    <>
      <Sidebar boards={boards} setToggleCreateBoard={setToggleCreateBoard} />
      <div className="flex-1 flex flex-col">
        {children}
      </div>
      <CreateBoardModal toggleCreateBoard={toggleCreateBoard} setToggleCreateBoard={setToggleCreateBoard} />
    </>
  )
}
