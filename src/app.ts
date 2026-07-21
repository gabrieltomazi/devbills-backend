import Fastify, { FastifyInstance } from "fastify";
import routes from "./routes";

const app: FastifyInstance = Fastify({
  logger:
  {
    level: process.env.NODE_ENV === 'dev' ? 'info' : 'error'
  }
});

app.register(routes, {prefix: '/api'})

export default app