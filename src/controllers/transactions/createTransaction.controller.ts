import { FastifyRequest, FastifyReply } from "fastify"
import { CreateTransactionBody, createTransactionSchema } from "../../schemas/transaction.schema"
import prisma from "../../config/prisma"


const createTransaction = async (req: FastifyRequest<{ Body: CreateTransactionBody }>, rep: FastifyReply): Promise<void> => {

  const userId = req.userId

  if (!userId) {
    return rep.status(401).send({ error: "Usuário não autenticado!" })
  }

  const result = createTransactionSchema.safeParse(req.body)

  if (!result.success) {
    const errorMessage = result.error.issues[0]?.message || "Validação falhou"
    return rep.status(400).send({ error: errorMessage })
  }

  const transaction = result.data;

  try {

    const category = await prisma.category.findFirst({
      where: {
        id: transaction.categoryId,
        type: transaction.type
      }
    });

    if (!category) {
      return rep.status(400).send({ error: "Cateogria inválida!" })
    }

    const parsedDate = new Date(transaction.date);

    const newTransaction = await prisma.transaction.create({
      data: {
        ...transaction,
        userId,
        date: parsedDate,
      },
      include: {
        category: true
      }


    });

    rep.status(201).send(newTransaction)
  } catch (error) {
    req.log.error("Erro ao criar transação" + error)
    rep.status(500).send({ error: "Erro interno de servidor" })

  }

}

export default createTransaction