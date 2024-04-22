"use server"
import { createBoard } from "@/server/queries/queries"

export async function createBoardAction(boardTitle: string, userId: string) {
  if (boardTitle.length <= 0) return
  const board = await createBoard(boardTitle, userId)
  return board
}

