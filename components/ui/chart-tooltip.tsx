"use client"

import { formatAmount } from "../../utils/helpers.tsx"

interface ChartTooltipProps {
  active?: boolean
  payload?: any[]
  label?: string
  fundData?: {
    previousValue?: number
    color?: string
  }
}

export function ChartTooltip({ active, payload, label, fundData }: ChartTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    const currentValue = data.value
    const previousValue = fundData?.previousValue || currentValue * 0.95 // Valeur par défaut si pas de données précédentes

    const percentageChange = ((currentValue - previousValue) / previousValue) * 100
    const isPositive = percentageChange >= 0

    return (
      <div className="bg-background border border-border rounded-2xl p-3 shadow-lg">
        <p className="text-sm font-medium text-foreground">{formatAmount(currentValue)}</p>
        <p className={`text-sm font-semibold ${isPositive ? "text-green-600" : "text-red-600"}`}>
          {isPositive ? "+" : ""}
          {percentageChange.toFixed(2)}%
        </p>
        <p className="text-xs text-muted-foreground">{data.fullDate}</p>
      </div>
    )
  }
  return null
}
