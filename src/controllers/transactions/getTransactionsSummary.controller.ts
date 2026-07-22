import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import { FastifyReply, FastifyRequest } from "fastify";
import { TransactionType } from "../../../generated/client";
import prisma from "../../config/prisma";
import { GetTransactionsSummaryQuery } from "../../schemas/transaction.schema";
import { CategorySummary } from "../../types/category.types";
import { TransactionSummary } from "../../types/transaction.types";

dayjs.extend(utc)


export const getTransactionsSummary = async (req: FastifyRequest<{ Querystring: GetTransactionsSummaryQuery }>, rep: FastifyReply): Promise<void> => {

  const userId = "userid123"

  if (!userId) {
    return rep.status(401).send({ error: "Usuário não autenticado!" })
  }

  const { month, year } = req.query

  if (!month || !year) {
    return rep.status(400).send({ error: "Mês e ano são obrigatórios" })
  }

  const startDate = dayjs.utc(`${year}-${month}-01`).startOf("month").toDate();
  const endDate = dayjs.utc(startDate).endOf("month").toDate();

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate
        }
      },
      orderBy: { date: 'asc' },
      include: {
        category: true,
      }
    })

    let totalExpenses = 0;
    let totalIncomes = 0;
    const groupedExpenses = new Map<string, CategorySummary>();

    for (const transaction of transactions) {

      // Se a transação for do tipo "expense" entra nessa validação
      if (transaction.type === TransactionType.expense) {

        // Damos um get no map, caso existir, a variável existing é preenchida
        // Caso não exista nós criamos
        const existing = groupedExpenses.get(transaction.categoryId) ?? {
          categoryId: transaction.categoryId,
          categoryName: transaction.category.name,
          categoryColor: transaction.category.color,
          amount: 0,
          percentage: 0,
        };

        // Preenche os valores da variável com o amount
        existing.amount += transaction.amount

        // Damos um set, colocando a categoryId como chave, e a variável, como valor
        groupedExpenses.set(transaction.categoryId, existing)

        totalExpenses += transaction.amount

      } else { // Se a transação for do tipo "income" entra nessa aqui

        totalIncomes += transaction.amount

      }
    }

    console.log(Array.from(groupedExpenses.values()));

    const summary: TransactionSummary = {
      totalExpenses,
      totalIncomes,
      balance: Number((totalIncomes - totalExpenses).toFixed(2)),
      expensesByCategory: Array.from(groupedExpenses.values()).map((entry) => ({
        ...entry,
        percentage: Number.parseFloat(((entry.amount / totalExpenses) * 100).toFixed(2))
      })).sort((a, b) => b.amount - a.amount)
    }

    return rep.status(200).send(summary)

  } catch (error) {
    req.log.error("Erro ao buscar transação" + error)
    rep.status(500).send({ error: "Erro interno do servidor" })
  }

}