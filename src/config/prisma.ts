import { PrismaClient } from "../../generated/client";
import { PrismaNeon } from '@prisma/adapter-neon'

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL,
})
const prisma = new PrismaClient({ adapter });

export const prismaConnect = async () => {
  try {
    await prisma.$connect();
    console.log("✅ DB Conectado com sucesso!")
  } catch (error) {
    console.error("❌ Falha ao conectar no DB")
  }
}

export default prisma