import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../config/prisma";



const getTransactions = async (req: FastifyRequest, rep: FastifyReply): Promise<void> => {

  const userId = "userid123"

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId
      },
      orderBy: {
        date: 'asc'
      },
      include: {
        category: true
      }
    })
    return rep.status(200).send(transactions)
  } catch (error) {
    req.log.error("Erro ao buscar transação" + error)
    rep.status(500).send({ error: "Erro interno do servidor" })
  }


}


export default getTransactions