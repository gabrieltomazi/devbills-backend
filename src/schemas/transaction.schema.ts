import { z } from 'zod/v3'
import { TransactionType } from '../../generated/client'

export const createTransactionSchema = z.object({
  description: z.string().min(1, 'A descrição é obrigatória'),
  amount: z.number().positive("O valor deve ser positivo"),
  date: z.coerce.date({
    invalid_type_error: "Data inválida"
  }),
  categoryId: z.string().uuid("Categoria inválida"),
  type: z.nativeEnum(TransactionType, {
    invalid_type_error: "Tipo não existente!"
  })
})
