import React from "react"
import { ArrowDownLeft, ArrowUpRight, Target, Calendar, Activity } from "lucide-react"

export const formatAmount = (amount: number) => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(amount)
}

export const getTransactionIcon = (type: string) => {
  switch (type) {
    case "deposit":
      return <ArrowDownLeft className="h-4 w-4 text-green-600" />
    case "withdrawal":
      return <ArrowUpRight className="h-4 w-4 text-red-600" />
    case "auto-round":
      return <Target className="h-4 w-4 text-centup-green-dark" />
    case "recurring":
      return <Calendar className="h-4 w-4 text-blue-600" />
    default:
      return <Activity className="h-4 w-4" />
  }
}