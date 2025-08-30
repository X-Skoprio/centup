export type Fund = {
  id: string
  name: string
  amount: number
  performance: number
  color: string
  description: string
  keyData: {
    risk: string
    minInvestment: string
    fees: string
    category: string
  }
}

export type Transaction = {
  id: string
  type: "deposit" | "withdrawal" | "auto-round" | "recurring"
  amount: number
  fund: string
  date: string
  description: string
}

export type Achievement = {
  id: string
  title: string
  description: string
  reward: number
  completed: boolean
  progress: number
  maxProgress: number
}
