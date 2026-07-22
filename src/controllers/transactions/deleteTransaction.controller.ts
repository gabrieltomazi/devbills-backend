import { FastifyReply, FastifyRequest } from "fastify";
import { DeleteTransactionParams } from "../../schemas/transaction.schema";
import prisma from "../../config/prisma";



export const deleteTransaction = async (req: FastifyRequest<{ Params: DeleteTransactionParams }>, rep: FastifyReply): Promise<void> => {

  const userId = "userid123"
  const { id } = req.params

  if (!userId) {
    return rep.status(401).send({ error: "Usuário não autenticado" })
  }

  try {

    const transaction = await prisma.transaction.findFirst({
      where: {
        id,
        userId
      }
    })

    if (!transaction) {
      return rep.status(400).send({ error: "ID da transação inválido!" })
    }

    await prisma.transaction.delete({ where: { id } })
    rep.status(200).send({ message: "Transação deletada com sucesso!" })

  } catch (error) {
    req.log.error(error)
    rep.status(500).send({ error: "Erro interno do servidor, falha ao deletar transação" })
  }

}