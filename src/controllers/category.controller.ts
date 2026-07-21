import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../config/prisma";



export const getCategories = async (req: FastifyRequest, rep: FastifyReply): Promise<void> => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    rep.status(200).send(categories);
  } catch (error) {
    req.log.error("❌ Erro ao buscar categorias" + error)
    rep.status(500).send({ error: "Erro ao buscar as categorias" });
  }

}