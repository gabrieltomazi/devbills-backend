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

// Type para o body de createTransactions
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
  month: z.string({ message: "O mês é obrigatório" }),
  year: z.string({ message: "O ano é obrigatório" })
})

// Type para os queryParams de transactionsSummary
export type GetTransactionsSummaryQuery = z.infer<typeof getTransactionsSummarySchema>

export const getHistorySchema = z.object({
  month: z.coerce.number().min(1).max(12),
  months: z.coerce.number().min(1).max(12).optional(),
  year: z.coerce.number().min(2000).max(2100),
})

export type GetHistoryQuery = z.infer<typeof getHistorySchema>

export const deleteTransactionSchema = z.object({
  id: z.string().uuid("Categoria inválida")
})

export type DeleteTransactionParams = z.infer<typeof deleteTransactionSchema>