import { FastifyInstance } from "fastify";
import zodToJsonSchema from "zod-to-json-schema";
import createTransaction from "../controllers/transactions/createTransaction.controller";
import getTransactions from "../controllers/transactions/getTransactions.controller";
import { createTransactionSchema, getTransactionsSchema } from "../schemas/transaction.schema";



const transactionRoutes = async (fastify: FastifyInstance): Promise<void> => {

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

}


export default transactionRoutes