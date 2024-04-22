"use server"
import { db } from "@/server/db"

export async function createBoard(boardTitle: string, userId: string) {
  if (boardTitle.length <= 0) return
  const board = await db.board.create({
    data: {
      title: boardTitle,
      authorId: userId!,
    }
  })
  return board.id
}

