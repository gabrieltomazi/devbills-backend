import { FastifyReply, FastifyRequest } from "fastify";
import { getAuth } from 'firebase-admin/auth';

declare module "fastify" {
  interface FastifyRequest {
    userId?: string;
  }
}


export const authMiddleware = async (
  req: FastifyRequest,
  rep: FastifyReply
): Promise<void> => {

  // Pegar o Bearer token dos Headers da request
  const authHeader = req.headers.authorization

  // Responder com status unauthorized se não mandou 
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    rep.status(401).send({ error: "Token de autorização não fornecido" })
    return
  }

  // Tratar o token 
  const token = authHeader.replace("Bearer ", "")

  try {
    const decodedToken = await getAuth().verifyIdToken(token)
    req.userId = decodedToken.uid
    console.log(decodedToken)
  } catch (error) {
    req.log.error("Erro ao verificar token" + error)
    rep.status(401).send({ error: "Token de autorização inválido ou expirado" })
    return
  }

}