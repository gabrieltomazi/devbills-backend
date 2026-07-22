import { TransactionType } from "../../generated/client";


export interface TransactionFilter {
  userId: string;
  date?: {
    gte: Date;
    lte: Date;
  },
  type?: TransactionType;
  categoryId?: string;
}