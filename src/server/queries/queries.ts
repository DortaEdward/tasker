import db from "@/db/db";

export async function getBoards(id: string) {
  return await db.board.findMany({ where: { authorId: id } })
}

export async function createBoard(boardTitle: string, userId: string) {
  const board = await db.board.create({
    data: {
      title: boardTitle,
      authorId: userId!,
    }
  })
  return board.id
}


export async function findBoardById(id: number, authorId: string) {
  const board = await db.board.findFirst({
    where: {
      id: id,
      authorId: authorId
    },
    include: {
      lists: true
    }
  })
  return board
}
