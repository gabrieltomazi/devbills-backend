import { FastifyInstance } from "fastify";
import zodToJsonSchema from "zod-to-json-schema";
import createTransaction from "../controllers/transactions/createTransaction.controller";
import { deleteTransaction } from "../controllers/transactions/deleteTransaction.controller";
import { getHistoryTransactions } from "../controllers/transactions/getHistoryTransaction.controller";
import getTransactions from "../controllers/transactions/getTransactions.controller";
import { getTransactionsSummary } from "../controllers/transactions/getTransactionsSummary.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createTransactionSchema, deleteTransactionSchema, getHistorySchema, getTransactionsSchema, getTransactionsSummarySchema } from "../schemas/transaction.schema";



const transactionRoutes = async (fastify: FastifyInstance): Promise<void> => {

  fastify.addHook('preHandler', authMiddleware)

  // Criação de transaction
  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      body: zodToJsonSchema(createTransactionSchema)
    },
    handler: createTransaction
  })

  // Buscar com filtros
  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      querystring: zodToJsonSchema(getTransactionsSchema)
    },
    handler: getTransactions
  })

  // Buscar resumo das transações
  fastify.route({
    method: "GET",
    url: "/summary",
    schema: {
      querystring: zodToJsonSchema(getTransactionsSummarySchema)
    },
    handler: getTransactionsSummary
  })

  //Histórico de transacaoes
  fastify.route({
    method: "GET",
    url: "/history",
    schema: {
      querystring: zodToJsonSchema(getHistorySchema),

    },
    handler: getHistoryTransactions,
  })

  // Deletar
  fastify.route({
    method: "DELETE",
    url: "/:id",
    schema: {
      params: zodToJsonSchema(deleteTransactionSchema)
    },
    handler: deleteTransaction
  })
}


export default transactionRoutes