"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useTheme } from "../../contexts/theme-context"
import {
  User,
  PlusCircle,
  ArrowDownLeft,
  Settings,
  Target,
  Trophy,
  ChevronRight,
  Moon,
  Sun,
  Activity,
  Euro,
  Percent,
  ChevronDown,
} from "lucide-react"
import { ResponsiveContainer, Area, AreaChart, Tooltip } from "recharts"
import { ChartTooltip } from "../ui/chart-tooltip"
import { funds, allTransactions, performanceData } from "../../data/mockData"
import { formatAmount, getTransactionIcon } from "../../utils/helpers.tsx"

interface HomePageProps {
  setActiveTab: (tab: string) => void
  setDepositMode: (mode: "deposit" | "withdraw") => void
}

export function HomePage({ setActiveTab, setDepositMode }: HomePageProps) {
  const [selectedFund, setSelectedFund] = useState("all")
  const [showPercentage, setShowPercentage] = useState(true)
  const [isFundPopupOpen, setIsFundPopupOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  
  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.popup-content') && !target.closest('.fund-selector')) {
        setIsFundPopupOpen(false)
      }
    }
    
    if (isFundPopupOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isFundPopupOpen])

  const totalAmount = funds.reduce((sum, fund) => sum + fund.amount, 0)
  const globalPerformance = funds.reduce((sum, fund) => sum + fund.performance * fund.amount, 0) / totalAmount
  const globalGainAmount = (totalAmount * globalPerformance) / 100

  return (
    <div className="space-y-4 pb-20">
      {/* Header */}
      <div className="pt-4 px-1">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Bonjour Vincent</h1>
          <p className="text-muted-foreground">Bienvenue sur CentUp</p>
        </div>
      </div>

      {/* Performance globale en haut sans carte */}
      <div className="relative text-center py-6">
        <div className="absolute top-2 right-4">
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-full p-0.5">
            <button
              onClick={() => setShowPercentage(true)}
              className={`p-1.5 rounded-full transition-all duration-200 ${
                showPercentage 
                  ? "bg-centup-green-dark text-white shadow-sm" 
                  : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              <Percent className="h-3 w-3" />
            </button>
            <button
              onClick={() => setShowPercentage(false)}
              className={`p-1.5 rounded-full transition-all duration-200 ${
                !showPercentage 
                  ? "bg-centup-green-dark text-white shadow-sm" 
                  : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              <Euro className="h-3 w-3" />
            </button>
          </div>
        </div>
        <p className="text-muted-foreground text-sm mb-2">Performance Globale</p>
        <button 
          onClick={() => setShowPercentage(!showPercentage)}
          className="text-5xl font-bold text-centup-green-dark mb-2 transition-all duration-200 hover:scale-105"
        >
          {showPercentage ? (
            <>
              {globalPerformance > 0 ? "+" : ""}
              {globalPerformance.toFixed(2)}%
            </>
          ) : (
            <>
              {globalGainAmount > 0 ? "+" : ""}
              {formatAmount(Math.abs(globalGainAmount))}
            </>
          )}
        </button>
        <p className="text-sm text-muted-foreground">Depuis le début</p>

        {/* Mini graphique avec tooltip */}
        <div className="h-24 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="colorValueHome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4C9282" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4C9282" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="value" stroke="#4C9282" strokeWidth={2} fill="url(#colorValueHome)" />
              <Tooltip content={<ChartTooltip fundData={{ color: "#4C9282" }} />} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Vue du portefeuille */}
      <Card className="rounded-3xl bg-card shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="w-2 h-2 bg-centup-green-dark rounded-full"></div>
            Mon Portefeuille
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center py-2">
              <div 
                className="fund-selector inline-flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity mb-1"
                onClick={() => setIsFundPopupOpen(true)}
              >
                <p className="text-lg font-semibold text-centup-green-dark">
                  {selectedFund === "all" ? "Portfolio Global" : funds.find(f => f.id === selectedFund)?.name}
                </p>
                <ChevronDown className={`h-4 w-4 text-centup-green-dark transition-transform ${isFundPopupOpen ? 'rotate-180' : ''}`} />
              </div>
              <p className="text-muted-foreground text-sm mb-2">Actifs sous gestion</p>
              <p className="text-3xl font-bold text-centup-green-dark">
                {selectedFund === "all"
                  ? formatAmount(totalAmount)
                  : formatAmount(funds.find((f) => f.id === selectedFund)?.amount || 0)}
              </p>
            </div>

            {/* Répartition des fonds si "tous" est sélectionné */}
            {selectedFund === "all" && (
              <div className="grid grid-cols-3 gap-3 mb-4">
                {funds.map((fund) => (
                  <div 
                    key={fund.id} 
                    className="text-center p-3 bg-muted/30 rounded-2xl cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => setSelectedFund(fund.id)}
                  >
                    <div className="w-3 h-3 rounded-full mx-auto mb-1" style={{ backgroundColor: fund.color }}></div>
                    <p className="text-xs font-medium">{fund.name.split(" - ")[1] || fund.name}</p>
                    <p className="text-xs text-muted-foreground">{formatAmount(fund.amount)}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-3">
              <Button
                className="flex-1 bg-centup-green-dark hover:bg-centup-green-dark/90 text-white rounded-2xl h-12"
                onClick={() => setActiveTab("deposit")}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Déposer
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-centup-green-dark text-centup-green-dark hover:bg-centup-green-dark/5 bg-transparent rounded-2xl h-12"
                onClick={() => {
                  setDepositMode("withdraw")
                  setActiveTab("deposit")
                }}
              >
                <ArrowDownLeft className="h-4 w-4 mr-2" />
                Retirer
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Popup pour sélectionner le fonds du portefeuille */}
      {isFundPopupOpen && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="popup-content bg-white dark:bg-card rounded-3xl shadow-2xl w-72 mx-4 animate-in zoom-in-95 duration-200">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-center">Sélectionner un fonds</h3>
              
              <div className="space-y-2">
                <div 
                  className={`p-4 rounded-2xl cursor-pointer transition-colors hover:bg-centup-green-dark/10 ${
                    selectedFund === "all" ? "bg-centup-green-dark/10 border border-centup-green-dark/20" : "bg-gray-50 dark:bg-gray-800"
                  }`}
                  onClick={() => {
                    setSelectedFund("all")
                    setIsFundPopupOpen(false)
                  }}
                >
                  <span className="font-medium">Tous les fonds</span>
                </div>
                {funds.map((fund) => (
                  <div 
                    key={fund.id}
                    className={`p-4 rounded-2xl cursor-pointer transition-colors hover:bg-centup-green-dark/10 ${
                      selectedFund === fund.id ? "bg-centup-green-dark/10 border border-centup-green-dark/20" : "bg-gray-50 dark:bg-gray-800"
                    }`}
                    onClick={() => {
                      setSelectedFund(fund.id)
                      setIsFundPopupOpen(false)
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: fund.color }}></div>
                      <span className="font-medium">{fund.name}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <button 
                className="w-full mt-6 p-3 bg-gray-100 dark:bg-gray-800 rounded-2xl font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setIsFundPopupOpen(false)}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Frame de redirection */}
      <Card className="rounded-3xl bg-centup-green-light/5 border-centup-green-light/20 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-centup-green-light/20 rounded-2xl">
                <Settings className="h-5 w-5 text-centup-green-dark" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Automatisation</h3>
                <p className="text-sm text-muted-foreground">Configurez l'arrondi automatique</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-centup-green-dark rounded-2xl">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Frame de progression utilisateur */}
      <Card className="rounded-3xl bg-orange-50/50 dark:bg-orange-950/20 border-orange-200/50 dark:border-orange-800/50 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-2xl animate-float">
                <Trophy className="h-5 w-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground">Niveau 3</h3>
                  <Badge variant="secondary" className="text-xs rounded-full">
                    65%
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">2 missions à compléter</p>
                <Progress value={65} className="w-32 h-2" />
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-orange-600 rounded-2xl"
              onClick={() => setActiveTab("missions")}
            >
              <Target className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Aperçu des dernières transactions */}
      <Card className="rounded-3xl shadow-sm">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-centup-green-dark" />
              Dernières Transactions
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-centup-green-dark hover:bg-centup-green-dark/5 rounded-2xl"
              onClick={() => setActiveTab("activity")}
            >
              Voir tout
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {allTransactions.slice(0, 3).map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-muted/20 rounded-2xl hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-2xl ${
                      transaction.type === "deposit"
                        ? "bg-green-100 dark:bg-green-900/20"
                        : transaction.type === "withdrawal"
                          ? "bg-red-100 dark:bg-red-900/20"
                          : transaction.type === "recurring"
                            ? "bg-blue-100 dark:bg-blue-900/20"
                            : "bg-centup-green-light/20"
                    }`}
                  >
                    {getTransactionIcon(transaction.type)}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {transaction.fund} • {new Date(transaction.date).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                </div>
                <span className={`font-semibold ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                  {transaction.amount > 0 ? "+" : ""}
                  {formatAmount(transaction.amount)}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
