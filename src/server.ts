import { env } from './config/env'
import app from './app'
import { prismaConnect } from './config/prisma'
import { initializeGlobalCategories } from './services/globalCategories.service';
import { initializeFirebaseAdmin } from './config/firebase';

const PORT = env.PORT

initializeFirebaseAdmin();

const startServer = async () => {

  try {
    await prismaConnect();
    await initializeGlobalCategories();
    await app.listen({ port: PORT }).then(() => {

      console.log(`Servidor rodando na porta ${PORT} 🚀`)
    })
  } catch (error) {
    console.error(error)
  }

}

startServer()