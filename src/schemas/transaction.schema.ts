import { z } from 'zod'
import { TransactionType } from '../../generated/client'

export const createTransactionSchema = z.object({
  description: z.string().min(1, 'A descrição é obrigatória'),
  amount: z.number().positive("O valor deve ser positivo"),
  date: z.coerce.date({
    error: "Data inválida"
  }),
  categoryId: z.uuid("Categoria inválida"),
  type: z.enum(TransactionType, {
    error: "Tipo não existente!"
  })
})
