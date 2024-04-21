"use client"
import { Preahvihear } from "next/font/google";
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react"
import { MdClose } from "react-icons/md";

type Props = {
  toggleCreateBoard: boolean;
  setToggleCreateBoard: Dispatch<SetStateAction<boolean>>;
}

type BoardDataType = {
  title: string;
  description: string;
  subtasks: string[];
  status: string
}

export default function CreateBoardModal({ toggleCreateBoard, setToggleCreateBoard }: Props) {
  const [boardData, setBoardData] = useState<BoardDataType>({
    title: "",
    description: "",
    subtasks: [],
    status: "",
  })
  const [subtask, setSubtask] = useState<string>("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    console.log(boardData)
  }

  function handleUpdateState(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setBoardData({
      ...boardData,
      [e.target.name]: e.target.value
    })
  }

  function addSubtask() {
    if (subtask.length <= 0) return

    setBoardData({
      ...boardData,
      subtasks: [...boardData.subtasks, subtask]
    })
    setSubtask("")
  }
  function removeSubtask(name: string) {
    setBoardData((prev) => ({
      ...prev,
      boardData: prev.subtasks.filter((val) => name !== val)
    })
    )
  }

  return (
    <div className={`w-full h-full bg-black/40 absolute top-0 left-0 ${toggleCreateBoard ? "flex" : "hidden"} items-center justify-center`}>
      <form onChange={handleSubmit} className="flex flex-col bg-slate-800 z-10 p-6 rounded-lg w-80 flex flex-col gap-4 relative">
        <div className="flex items-center justify-between text-white">
          <p className="text-lg font-bold">Add New Task</p>
          <MdClose className="cursor-pointer" size={24} onClick={() => setToggleCreateBoard(false)} />
        </div>

        <fieldset className="flex flex-col">
          <label className="text-white font-bold text-sm">Title</label>
          <input name="name" onChange={handleUpdateState} placeholder="e.g. Take coffee break" className="bg-transparent border border-gray-400 px-3 py-1 rounded text-sm" />
        </fieldset>


        <fieldset className="flex flex-col">
          <label className="text-white font-bold text-sm">Description</label>
          <textarea name="description" onChange={handleUpdateState} placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little." className="bg-transparent border border-gray-400 px-3 py-1 rounded text-sm h-20 resize-none" />
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <label className="text-white font-bold text-sm">Substasks</label>
          <div className="flex flex-col gap-2 max-h-24 overflow-y-auto">
            <div>
              {
                boardData.subtasks.map((substack, idx) => {
                  return (
                    <div
                      key={`${idx}-${substack}`}
                      className="bg-transparent border border-gray-400 px-3 py-1 rounded text-sm flex-1"
                    >
                      {substack}
                    </div>
                  )
                })
              }
            </div>
            <div className="flex items-center gap-2">
              <input placeholder="e.g. Make coffee" onChange={(e) => setSubtask(e.target.value)} className="bg-transparent border border-gray-400 px-3 py-1 rounded text-sm flex-1" />
              <MdClose className="text-white cursor-pointer" size={24} />
            </div>
          </div>
          <button type="button" onClick={() => addSubtask} className="bg-gray-100 text-indigo-500 font-medium text-xs py-2 rounded-2xl">+ Add New Subtask</button>
        </fieldset>


        <fieldset className="flex flex-col">
          <label className="text-white font-bold text-sm">Status</label>
          <select name="status" onChange={handleUpdateState} className="bg-transparent border border-gray-400 px-3 py-1 rounded text-sm text-white">
            {/* Get list of lists and display them */}
            <option>Todo</option>
          </select>
        </fieldset>

        <button type="submit" className="bg-indigo-500 text-white text-xs py-2 rounded-2xl">Create Task</button>
      </form>
    </div>
  )
}