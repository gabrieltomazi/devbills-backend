import { FastifyInstance } from "fastify";
import createTransaction from "../controllers/transactions/createTransaction.controller";
import getTransactions from "../controllers/transactions/getTransactions.controller";
import zodToJsonSchema from "zod-to-json-schema";
import { createTransactionSchema } from "../schemas/transaction.schema";



const transactionRoutes = async (fastify: FastifyInstance): Promise<void> => {

  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      body: zodToJsonSchema(createTransactionSchema)
    },
    handler: createTransaction
  })
  fastify.get("/", getTransactions)

}


export default transactionRoutes