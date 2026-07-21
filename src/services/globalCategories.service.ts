import { TransactionType, Category } from "../../generated/client";
import prisma from "../config/prisma";

type GlobalCategoryInput = Pick<Category, "name" | "color" | "type">

const globalCategories: GlobalCategoryInput[] = [
  // Despesas
  { name: "Alimentação", color: "#FF5733", type: TransactionType.expense },
  { name: "Transporte", color: "#33A8FF", type: TransactionType.expense },
  { name: "Moradia", color: "#33FF57", type: TransactionType.expense },
  { name: "Saúde", color: "#F033FF", type: TransactionType.expense },
  { name: "Educação", color: "#FF3366", type: TransactionType.expense },
  { name: "Lazer", color: "#FFBA33", type: TransactionType.expense },
  { name: "Compras", color: "#33FFF6", type: TransactionType.expense },
  { name: "Outros", color: "#B033FF", type: TransactionType.expense },

  // Receitas
  { name: "Salário", color: "#33FF57", type: TransactionType.income },
  { name: "Freelance", color: "#33A8FF", type: TransactionType.income },
  { name: "Investimentos", color: "#FFBA33", type: TransactionType.income },
  { name: "Outros", color: "#B033FF", type: TransactionType.income },
];

export const initializeGlobalCategories = async (): Promise<Category[]> => {

  const createdCategories: Category[] = []

  for (const cat of globalCategories) {
    try {
      const existingCategory = await prisma.category.findFirst({
        where: {
          name: cat.name,
          type: cat.type
        }
      })

      if (!existingCategory) {
        const newCategory = await prisma.category.create({ data: cat })
        console.log(`✅ Criada: ${newCategory.name}`)
      } else {
        createdCategories.push(existingCategory)
      }
    } catch (error) {
      console.log(error)
    }
  }
  console.log('✅ Todas as categorias inicializadas!')
  return createdCategories
}