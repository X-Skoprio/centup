"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown } from "lucide-react"
import { funds, allTransactions } from "../../data/mockData"
import { formatAmount, getTransactionIcon } from "../../utils/helpers.tsx"

export function ActivityPage() {
  const [selectedFund, setSelectedFund] = useState("all")
  const [timeFilter, setTimeFilter] = useState("all")
  const [transactionType, setTransactionType] = useState("all")
  const [entrySubType, setEntrySubType] = useState("all")
  
  // Popup states
  const [activePopup, setActivePopup] = useState<'fund' | 'type' | 'detail' | null>(null)
  
  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.popup-content') && !target.closest('.filter-card')) {
        setActivePopup(null)
      }
    }
    
    if (activePopup) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [activePopup])

  const filteredTransactions = allTransactions.filter((transaction) => {
    const fundMatch = selectedFund === "all" || transaction.fund.includes(selectedFund)
    
    let typeMatch = true
    if (transactionType === "entree") {
      typeMatch = transaction.amount > 0
      // Sous-filtre pour les entrées
      if (entrySubType !== "all") {
        typeMatch = typeMatch && transaction.type === entrySubType
      }
    } else if (transactionType === "sortie") {
      typeMatch = transaction.amount < 0
    }
    // "all" accepte tout
    
    // Filtre temporel
    const transactionDate = new Date(transaction.date)
    const now = new Date()
    let timeMatch = true
    
    if (timeFilter === "7d") {
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      timeMatch = transactionDate >= sevenDaysAgo
    } else if (timeFilter === "1m") {
      const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
      timeMatch = transactionDate >= oneMonthAgo
    } else if (timeFilter === "3m") {
      const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate())
      timeMatch = transactionDate >= threeMonthsAgo
    }
    // "all" ne nécessite pas de filtre temporel
    
    return fundMatch && typeMatch && timeMatch
  })

  const getFundDisplayName = (fundName: string) => {
    const fund = funds.find(f => f.name === fundName || f.id === fundName)
    return fund ? fund.name.split(" - ")[1] || fund.name : fundName
  }

  return (
    <div className="space-y-6 pb-20 pt-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-6">Activités</h1>
      </div>

      {/* Résumé rapide */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-centup-green-dark to-centup-green-light rounded-3xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/80 mb-1">Ce mois</p>
              <p className="text-2xl font-bold">
                {formatAmount(filteredTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0))}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-gray-500 to-gray-600 dark:from-gray-600 dark:to-gray-700 rounded-3xl p-5 text-white shadow-lg">
          <div>
            <p className="text-sm text-white/80 mb-1">Transactions</p>
            <p className="text-2xl font-bold">{filteredTransactions.length}</p>
          </div>
        </div>
      </div>

      {/* Filtres en 3 cartes */}
      <div className="grid grid-cols-3 gap-3">
        {/* Carte 1: Sélecteur de fonds */}
        <Card className="filter-card rounded-2xl bg-centup-green-dark/5 border-centup-green-dark/20 cursor-pointer hover:shadow-md transition-all" onClick={() => setActivePopup('fund')}>
          <CardContent className="pt-3 pb-3">
            <p className="text-xs text-muted-foreground mb-2 text-center">Fonds</p>
            <div className="flex items-center justify-center gap-1">
              <span className="text-sm font-medium text-centup-green-dark text-center">
                {selectedFund === "all" ? "Tous" : getFundDisplayName(selectedFund).split(" ")[0]}
              </span>
              <ChevronDown className={`h-3 w-3 text-centup-green-dark flex-shrink-0 transition-transform ${activePopup === 'fund' ? 'rotate-180' : ''}`} />
            </div>
          </CardContent>
        </Card>

        {/* Carte 2: Type de transaction */}
        <Card className="filter-card rounded-2xl bg-centup-green-dark/5 border-centup-green-dark/20 cursor-pointer hover:shadow-md transition-all" onClick={() => setActivePopup('type')}>
          <CardContent className="pt-3 pb-3">
            <p className="text-xs text-muted-foreground mb-2 text-center">Type</p>
            <div className="flex items-center justify-center gap-1">
              <span className="text-sm font-medium text-centup-green-dark text-center">
                {transactionType === "all" ? "Tout" : transactionType === "entree" ? "Entrées" : "Sorties"}
              </span>
              <ChevronDown className={`h-3 w-3 text-centup-green-dark flex-shrink-0 transition-transform ${activePopup === 'type' ? 'rotate-180' : ''}`} />
            </div>
          </CardContent>
        </Card>

        {/* Carte 3: Détail des entrées */}
        <Card className={`filter-card rounded-2xl cursor-pointer transition-all ${
          transactionType === "entree" 
            ? "bg-centup-green-dark/5 border-centup-green-dark/20 hover:shadow-md" 
            : "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-50 cursor-not-allowed"
        }`} onClick={() => transactionType === "entree" && setActivePopup('detail')}>
          <CardContent className="pt-3 pb-3">
            <p className="text-xs text-muted-foreground mb-2 text-center">Détail</p>
            <div className="flex items-center justify-center gap-1">
              <span className={`text-sm font-medium text-center ${
                transactionType === "entree" ? "text-centup-green-dark" : "text-gray-400"
              }`}>
                {entrySubType === "all" ? "Tout" :
                 entrySubType === "auto-round" ? "Arrondi" :
                 entrySubType === "recurring" ? "Récurrent" : "Dépôt"}
              </span>
              <ChevronDown className={`h-3 w-3 flex-shrink-0 transition-transform ${
                transactionType === "entree" ? "text-centup-green-dark" : "text-gray-400"
              } ${activePopup === 'detail' ? 'rotate-180' : ''}`} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres de période en boutons */}
      <div className="flex gap-2 justify-center">
        {[
          { value: "7d", label: "7J" },
          { value: "1m", label: "1M" },
          { value: "3m", label: "3M" },
          { value: "all", label: "Tout" }
        ].map(({ value, label }) => (
          <button
            key={value}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              timeFilter === value 
                ? "bg-centup-green-dark text-white shadow-md" 
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            onClick={() => setTimeFilter(value)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Popup central pour les filtres */}
      {activePopup && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="popup-content bg-white dark:bg-card rounded-3xl shadow-2xl w-72 mx-4 animate-in zoom-in-95 duration-200">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-center">
                {activePopup === 'fund' ? 'Sélectionner un fonds' :
                 activePopup === 'type' ? 'Type de transaction' :
                 activePopup === 'detail' ? 'Détail des entrées' :
                 activePopup === 'period' ? 'Période' : 'Filtre'}
              </h3>
              
              <div className="space-y-2">
                {activePopup === 'fund' && (
                  <>
                    <div 
                      className={`p-4 rounded-2xl cursor-pointer transition-colors hover:bg-centup-green-dark/10 ${
                        selectedFund === "all" ? "bg-centup-green-dark/10 border border-centup-green-dark/20" : "bg-gray-50 dark:bg-gray-800"
                      }`}
                      onClick={() => {
                        setSelectedFund("all")
                        setActivePopup(null)
                      }}
                    >
                      <span className="font-medium">Tous les fonds</span>
                    </div>
                    {funds.map((fund) => (
                      <div 
                        key={fund.id}
                        className={`p-4 rounded-2xl cursor-pointer transition-colors hover:bg-centup-green-dark/10 ${
                          selectedFund === fund.name ? "bg-centup-green-dark/10 border border-centup-green-dark/20" : "bg-gray-50 dark:bg-gray-800"
                        }`}
                        onClick={() => {
                          setSelectedFund(fund.name)
                          setActivePopup(null)
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: fund.color }}></div>
                          <span className="font-medium">{getFundDisplayName(fund.name)}</span>
                        </div>
                      </div>
                    ))}
                  </>
                )}
                
                {activePopup === 'type' && (
                  [
                    { value: "all", label: "Tout" },
                    { value: "entree", label: "Entrées" },
                    { value: "sortie", label: "Sorties" }
                  ].map(({ value, label }) => (
                    <div 
                      key={value}
                      className={`p-4 rounded-2xl cursor-pointer transition-colors hover:bg-centup-green-dark/10 ${
                        transactionType === value ? "bg-centup-green-dark/10 border border-centup-green-dark/20" : "bg-gray-50 dark:bg-gray-800"
                      }`}
                      onClick={() => {
                        setTransactionType(value)
                        if (value !== "entree") {
                          setEntrySubType("all")
                        }
                        setActivePopup(null)
                      }}
                    >
                      <span className="font-medium">{label}</span>
                    </div>
                  ))
                )}
                
                {activePopup === 'detail' && (
                  [
                    { value: "all", label: "Tout" },
                    { value: "auto-round", label: "Arrondi automatique" },
                    { value: "recurring", label: "Virement récurrent" },
                    { value: "deposit", label: "Dépôt manuel" }
                  ].map(({ value, label }) => (
                    <div 
                      key={value}
                      className={`p-4 rounded-2xl cursor-pointer transition-colors hover:bg-centup-green-dark/10 ${
                        entrySubType === value ? "bg-centup-green-dark/10 border border-centup-green-dark/20" : "bg-gray-50 dark:bg-gray-800"
                      }`}
                      onClick={() => {
                        setEntrySubType(value)
                        setActivePopup(null)
                      }}
                    >
                      <span className="font-medium">{label}</span>
                    </div>
                  ))
                )}
                
              </div>
              
              <button 
                className="w-full mt-6 p-3 bg-gray-100 dark:bg-gray-800 rounded-2xl font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setActivePopup(null)}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Liste des transactions épurée */}
      <div className="space-y-3">
        {filteredTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 bg-white dark:bg-card rounded-2xl border hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
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
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-muted-foreground">{transaction.date}</p>
              </div>
            </div>
            <div className="text-right">
              <span className={`font-bold text-lg ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                {transaction.amount > 0 ? "+" : ""}
                {formatAmount(transaction.amount)}
              </span>
              <p className="text-xs text-muted-foreground">{getFundDisplayName(transaction.fund)}</p>
            </div>
          </div>
        ))}
      </div>

      {filteredTransactions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aucune transaction trouvée</p>
        </div>
      )}
    </div>
  )
}
