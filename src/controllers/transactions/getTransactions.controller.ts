import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../config/prisma";
import { GetTransactionsQuery } from "../../schemas/transaction.schema";
import { TransactionFilter } from "../../types/transaction.types";

dayjs.extend(utc)

const getTransactions = async (req: FastifyRequest<{ Querystring: GetTransactionsQuery }>, rep: FastifyReply): Promise<void> => {

  const userId = req.userId

  if (!userId) {
    return rep.status(401).send({ error: "Usuário não autenticado!" })
  }

  const { month, year, type, categoryId } = req.query

  const filters: TransactionFilter = { userId }

  if (month && year) {
    const startDate = dayjs.utc(`${year}-${month}-01`).startOf("month").toDate();
    const endDate = dayjs.utc(startDate).endOf("month").toDate();
    filters.date = { gte: startDate, lte: endDate }
  }

  if (type) {
    filters.type = type
  }

  if (categoryId) {
    filters.categoryId = categoryId
  }

  try {
    const transactions = await prisma.transaction.findMany({
      where: filters,
      orderBy: { date: 'asc' },
      include: {
        category: {
          select: {
            color: true,
            name: true,
            type: true
          }
        }
      }
    })
    return rep.status(200).send(transactions)
  } catch (error) {
    req.log.error("Erro ao buscar transação" + error)
    rep.status(500).send({ error: "Erro interno do servidor" })
  }


}


export default getTransactions