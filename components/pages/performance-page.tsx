"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, ArrowUpRight, Info, TrendingUp, ChevronDown, DollarSign, Repeat, Coins, CreditCard } from "lucide-react"
import { XAxis, YAxis, ResponsiveContainer, Area, AreaChart, Tooltip } from "recharts"
import { ChartTooltip } from "../ui/chart-tooltip"
import { funds, performanceDataByTimeframe, fundContributionDetails } from "../../data/mockData"
import { formatAmount } from "../../utils/helpers.tsx"

export function PerformancePage() {
  const [selectedPerformanceFund, setSelectedPerformanceFund] = useState("A")
  const [timeFilter, setTimeFilter] = useState("7d")
  const [isFundPopupOpen, setIsFundPopupOpen] = useState(false)
  
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

  const currentData =
    performanceDataByTimeframe[timeFilter as keyof typeof performanceDataByTimeframe][
      selectedPerformanceFund as keyof (typeof performanceDataByTimeframe)["7d"]
    ]

  const selectedFund = funds.find((f) => f.id === selectedPerformanceFund)
  const contributionDetails = fundContributionDetails[selectedPerformanceFund as keyof typeof fundContributionDetails]

  return (
    <div className="space-y-4 pb-20 pt-4">
      {/* Titre de la page */}
      <div className="px-1 mb-4">
        <h1 className="text-2xl font-bold text-foreground">Fonds</h1>
      </div>

      {/* Sélecteur de fonds centré */}
      <div className="text-center py-2 relative">
        <div 
          className="fund-selector inline-flex items-center gap-2 cursor-pointer hover:text-centup-green-dark transition-colors"
          onClick={() => setIsFundPopupOpen(true)}
        >
          <span className="text-lg font-semibold text-centup-green-dark">{selectedFund?.name}</span>
          <ChevronDown className={`h-4 w-4 text-centup-green-dark transition-transform ${isFundPopupOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {/* Contenu principal */}
      <div className="text-center">

        <p className="text-5xl font-bold text-centup-green-dark mb-2">{formatAmount(selectedFund?.amount || 0)}</p>

        <p
          className={`text-xl font-bold mb-4 ${(selectedFund?.performance || 0) > 0 ? "text-green-600" : "text-red-600"}`}
        >
          {(selectedFund?.performance || 0) > 0 ? "+" : ""}
          {selectedFund?.performance.toFixed(2)}%
        </p>

        {/* Graphique détaillé avec tooltip */}
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={currentData}>
              <defs>
                <linearGradient id="colorValuePerf" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={selectedFund?.color || "#4C9282"} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={selectedFund?.color || "#4C9282"} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6B7280" }} />
              <YAxis hide />
              <Area
                type="monotone"
                dataKey="value"
                stroke={selectedFund?.color || "#4C9282"}
                strokeWidth={2}
                fill="url(#colorValuePerf)"
              />
              <Tooltip content={<ChartTooltip fundData={{ color: selectedFund?.color }} />} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <Tabs value={timeFilter} onValueChange={setTimeFilter} className="mt-4">
          <TabsList className="grid w-full grid-cols-5 rounded-2xl">
            <TabsTrigger value="7d" className="rounded-2xl">
              7J
            </TabsTrigger>
            <TabsTrigger value="1m" className="rounded-2xl">
              1M
            </TabsTrigger>
            <TabsTrigger value="3m" className="rounded-2xl">
              3M
            </TabsTrigger>
            <TabsTrigger value="1y" className="rounded-2xl">
              1A
            </TabsTrigger>
            <TabsTrigger value="all" className="rounded-2xl">
              Tout
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Actions rapides */}
      <div className="flex gap-3 px-1">
        <Button size="sm" className="bg-centup-green-dark hover:bg-centup-green-dark/90 rounded-2xl flex-1 h-12">
          <PlusCircle className="h-4 w-4 mr-2" />
          Déposer
        </Button>
        <Button variant="outline" size="sm" className="rounded-2xl flex-1 h-12 bg-transparent">
          <ArrowUpRight className="h-4 w-4 mr-2" />
          Retirer
        </Button>
      </div>

      {/* Performance globale comparative */}
      <Card className="rounded-3xl bg-centup-green-dark/5 border-centup-green-dark/20 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-centup-green-dark" />
            Performance Globale
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-muted-foreground text-sm">Portefeuille total</p>
              <p className="text-2xl font-bold text-centup-green-dark">{formatAmount(totalAmount)}</p>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground text-sm">Performance moyenne</p>
              <p className={`text-xl font-bold ${globalPerformance > 0 ? "text-green-600" : "text-red-600"}`}>
                {globalPerformance > 0 ? "+" : ""}
                {globalPerformance.toFixed(2)}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Détail des contributions */}
      <Card className="rounded-3xl shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-centup-green-dark" />
            Détail des Contributions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Total investi */}
          <div className="text-center py-4 border-b border-gray-100 dark:border-gray-800">
            <p className="text-sm text-muted-foreground mb-1">Total investi</p>
            <p className="text-3xl font-bold text-centup-green-dark mb-2">{formatAmount(contributionDetails?.totalContributed || 0)}</p>
            <div className="flex items-center justify-center gap-2">
              <p className={`text-lg font-bold ${(contributionDetails?.totalGains.amount || 0) > 0 ? "text-green-600" : "text-red-600"}`}>
                {(contributionDetails?.totalGains.amount || 0) > 0 ? "+" : ""}
                {formatAmount(contributionDetails?.totalGains.amount || 0)}
              </p>
              <p className={`text-sm ${(contributionDetails?.totalGains.percentage || 0) > 0 ? "text-green-600" : "text-red-600"}`}>
                ({(contributionDetails?.totalGains.percentage || 0) > 0 ? "+" : ""}{contributionDetails?.totalGains.percentage.toFixed(1)}%)
              </p>
            </div>
          </div>

          {/* Répartition épurée */}
          <div className="space-y-4">
            {/* Dépôts manuels */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-centup-green-dark"></div>
                <div>
                  <p className="text-sm font-semibold">Dépôts manuels</p>
                  <p className="text-xs text-muted-foreground">{contributionDetails?.manualDeposits.percentage.toFixed(1)}% du total</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">{formatAmount(contributionDetails?.manualDeposits.amount || 0)}</p>
                <p className={`text-xs font-medium ${(contributionDetails?.manualDeposits.gains.amount || 0) > 0 ? "text-green-600" : "text-red-600"}`}>
                  {(contributionDetails?.manualDeposits.gains.amount || 0) > 0 ? "+" : ""}
                  {formatAmount(contributionDetails?.manualDeposits.gains.amount || 0)}
                </p>
              </div>
            </div>

            {/* Arrondis automatiques */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-centup-green-light"></div>
                <div>
                  <p className="text-sm font-semibold">Arrondis automatiques</p>
                  <p className="text-xs text-muted-foreground">{contributionDetails?.autoRounds.percentage.toFixed(1)}% du total</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">{formatAmount(contributionDetails?.autoRounds.amount || 0)}</p>
                <p className={`text-xs font-medium ${(contributionDetails?.autoRounds.gains.amount || 0) > 0 ? "text-green-600" : "text-red-600"}`}>
                  {(contributionDetails?.autoRounds.gains.amount || 0) > 0 ? "+" : ""}
                  {formatAmount(contributionDetails?.autoRounds.gains.amount || 0)}
                </p>
              </div>
            </div>

            {/* Virements récurrents */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <div>
                  <p className="text-sm font-semibold">Virements récurrents</p>
                  <p className="text-xs text-muted-foreground">{contributionDetails?.recurringTransfers.percentage.toFixed(1)}% du total</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">{formatAmount(contributionDetails?.recurringTransfers.amount || 0)}</p>
                <p className={`text-xs font-medium ${(contributionDetails?.recurringTransfers.gains.amount || 0) > 0 ? "text-green-600" : "text-red-600"}`}>
                  {(contributionDetails?.recurringTransfers.gains.amount || 0) > 0 ? "+" : ""}
                  {formatAmount(contributionDetails?.recurringTransfers.gains.amount || 0)}
                </p>
              </div>
            </div>
          </div>

          {/* Barre de progression visuelle */}
          <div className="pt-4">
            <div className="flex h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
              <div 
                className="bg-centup-green-dark transition-all duration-300"
                style={{ width: `${contributionDetails?.manualDeposits.percentage}%` }}
              ></div>
              <div 
                className="bg-centup-green-light transition-all duration-300"
                style={{ width: `${contributionDetails?.autoRounds.percentage}%` }}
              ></div>
              <div 
                className="bg-green-400 transition-all duration-300"
                style={{ width: `${contributionDetails?.recurringTransfers.percentage}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informations sur le fonds */}
      <Card className="rounded-3xl shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />À propos du fonds
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{selectedFund?.description}</p>

          <div className="grid grid-cols-2 gap-4">
            {Object.entries(selectedFund?.keyData || {}).map(([key, value]) => (
              <div key={key} className="p-3 bg-muted/30 rounded-2xl">
                <p className="text-xs text-muted-foreground capitalize">
                  {key === "risk"
                    ? "Risque"
                    : key === "minInvestment"
                      ? "Investissement min."
                      : key === "fees"
                        ? "Frais"
                        : "Catégorie"}
                </p>
                <p className="font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Popup pour sélectionner le fonds */}
      {isFundPopupOpen && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="popup-content bg-white dark:bg-card rounded-3xl shadow-2xl w-72 mx-4 animate-in zoom-in-95 duration-200">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-center">Sélectionner un fonds</h3>
              
              <div className="space-y-2">
                {funds.map((fund) => (
                  <div 
                    key={fund.id}
                    className={`p-4 rounded-2xl cursor-pointer transition-colors hover:bg-centup-green-dark/10 ${
                      selectedPerformanceFund === fund.id ? "bg-centup-green-dark/10 border border-centup-green-dark/20" : "bg-gray-50 dark:bg-gray-800"
                    }`}
                    onClick={() => {
                      setSelectedPerformanceFund(fund.id)
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
    </div>
  )
}
