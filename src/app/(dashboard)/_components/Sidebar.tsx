"use client"
import { Dispatch, SetStateAction, useState } from "react";
import { SiTask } from "react-icons/si";

type Props = {
  setToggleCreateBoard: Dispatch<SetStateAction<boolean>>;
}

export default function Sidebar({ setToggleCreateBoard }: Props) {
  const [active, setActive] = useState(false);
  const arr = [1, 2];
  const boards = false;

  function truncateText(text: string) {
    const limit = 8
    if (text.length < limit) {
      return text
    }
    const difference = text.length - limit
    return text.slice(0, difference) + '...'
  }

  return (
    <aside className="w-52 border-r border-gray-400 flex flex-col max-h-screen">
      <section className="h-20 flex items-center justify-center">
        <h1 className="text-2xl font-bold text-white text-center text-indigo-500">Tasky</h1>
      </section>
      <section className="flex-1 overflow-y-auto flex flex-col gap-4">
        <p className="capitalize mx-auto text-gray-300">All Boards ({arr.length})</p>
        <div className="flex flex-col gap-2 pr-4 flex-1 pb-4 w-full">
          {
            arr.map(el => {
              return (
                <div key={el} className={`w-full px-2 bg-indigo-600 cursor-pointer hover:bg-indigo-800 rounded-r-lg flex py-1 items-center gap-2 ${active ? "text-white" : "text-gray-200"}`}>
                  <SiTask />
                  <p className="text-sm">{truncateText("Board Name For the test")}</p>
                </div>
              )
            })
          }
          <div onClick={() => setToggleCreateBoard(true)} className="w-full px-2 cursor-pointer rounded-r-lg flex py-1 items-center gap-2 text-blue-600 hover:text-blue-800">
            <SiTask />
            <p className="text-sm">+ Create New Board</p>
          </div>
        </div>
      </section>
    </aside>
  )
}