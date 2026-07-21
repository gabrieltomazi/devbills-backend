import { FastifyInstance } from "fastify";
import createTransaction from "../controllers/transactions/createTransaction.controller";



const transactionRoutes = async (fastify: FastifyInstance): Promise<void> => {

  fastify.post("/", createTransaction)

}


export default transactionRoutes