import db from "@/db/db";

export async function getBoards() {
  return await db.board.findMany()
}
