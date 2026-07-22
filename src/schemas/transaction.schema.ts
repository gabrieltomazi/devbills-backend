import { z } from 'zod/v3'
import { TransactionType } from '../../generated/client'

// Schema do zod para criar uma transaction
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

export type CreateTransactionBody = z.infer<typeof createTransactionSchema>

// Schema do zod para buscar as transactions
export const getTransactionsSchema = z.object({
  month: z.string().optional(),
  year: z.string().optional(),
  type: z.nativeEnum(TransactionType, {
    invalid_type_error: "Tipo não existente!"
  }).optional(),
  categoryId: z.string().uuid("Categoria inválida").optional()
})

// Type para os queryParams de transactions
export type GetTransactionsQuery = z.infer<typeof getTransactionsSchema>

// Schema do zod de transactionsSummary
export const getTransactionsSummarySchema = z.object({
  month: z.string(),
  year: z.string()
})

export type GetTransactionsSummaryQuery = z.infer<typeof getTransactionsSummarySchema>