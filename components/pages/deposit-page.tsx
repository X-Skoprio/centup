"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Wallet, ArrowDownLeft, ArrowUpRight, ChevronDown } from "lucide-react"
import { funds } from "../../data/mockData"
import { formatAmount } from "../../utils/helpers.tsx"

interface DepositPageProps {
  depositMode: "deposit" | "withdraw"
  setDepositMode: (mode: "deposit" | "withdraw") => void
}

export function DepositPage({ depositMode, setDepositMode }: DepositPageProps) {
  const [depositAmount, setDepositAmount] = useState("")
  const [selectedDepositFund, setSelectedDepositFund] = useState("A")
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

  return (
    <div className="space-y-6 pt-4">
      {/* Montant en grand */}
      <div className="text-center py-8 pb-4">
        <h1 className="text-2xl font-bold text-foreground mb-8">
          {depositMode === "deposit" ? "Déposer des fonds" : "Retirer des fonds"}
        </h1>
        <p className="text-muted-foreground text-sm mb-4">Montant</p>
        <div className="relative">
          <Input
            type="number"
            placeholder="0"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            className="text-7xl font-bold text-center border-none bg-transparent text-centup-green-dark focus-visible:ring-0 focus-visible:ring-offset-0 h-24 px-0"
            style={{
              fontSize: "4rem",
              lineHeight: "1.2",
              padding: "0",
            }}
          />
          <span className="text-3xl font-bold text-muted-foreground absolute right-4 top-1/2 transform -translate-y-1/2">
            €
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-8">
          {["50", "100", "500"].map((amount) => (
            <Button
              key={amount}
              variant="outline"
              size="sm"
              onClick={() => setDepositAmount(amount)}
              className="rounded-2xl h-12 text-base font-semibold"
            >
              {amount}€
            </Button>
          ))}
        </div>
      </div>

      {/* Sélection Déposer/Retirer */}
      <div className="grid grid-cols-2 gap-4 -mt-6">
        <Card
          className={`rounded-3xl cursor-pointer transition-all ${
            depositMode === "deposit"
              ? "bg-centup-green-dark/10 border-centup-green-dark shadow-md"
              : "bg-muted/20 border-muted hover:bg-muted/30"
          }`}
          onClick={() => setDepositMode("deposit")}
        >
          <CardContent className="pt-2 pb-2">
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  depositMode === "deposit" ? "bg-centup-green-dark" : "bg-muted"
                }`}
              >
                <ArrowDownLeft
                  className={`h-4 w-4 ${depositMode === "deposit" ? "text-white" : "text-muted-foreground"}`}
                />
              </div>
              <h3 className={`font-semibold ${depositMode === "deposit" ? "text-centup-green-dark" : "text-foreground"}`}>
                Déposer
              </h3>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`rounded-3xl cursor-pointer transition-all ${
            depositMode === "withdraw"
              ? "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800 shadow-md"
              : "bg-muted/20 border-muted hover:bg-muted/30"
          }`}
          onClick={() => setDepositMode("withdraw")}
        >
          <CardContent className="pt-2 pb-2">
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  depositMode === "withdraw" ? "bg-red-500" : "bg-muted"
                }`}
              >
                <ArrowUpRight
                  className={`h-4 w-4 ${depositMode === "withdraw" ? "text-white" : "text-muted-foreground"}`}
                />
              </div>
              <h3 className={`font-semibold ${depositMode === "withdraw" ? "text-red-600" : "text-foreground"}`}>
                Retirer
              </h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sélection du fonds */}
      <Card className="rounded-3xl shadow-sm">
        <CardHeader>
          <CardTitle>Sélectionner le fonds</CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className="fund-selector flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={() => setIsFundPopupOpen(true)}
          >
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: funds.find(f => f.id === selectedDepositFund)?.color }}></div>
              <span className="font-medium">{funds.find(f => f.id === selectedDepositFund)?.name}</span>
            </div>
            <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isFundPopupOpen ? 'rotate-180' : ''}`} />
          </div>
        </CardContent>
      </Card>

      {/* Récapitulatif */}
      <Card className="rounded-3xl shadow-sm">
        <CardHeader>
          <CardTitle>Récapitulatif</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span>Action</span>
            <span className="font-semibold">{depositMode === "deposit" ? "Dépôt" : "Retrait"}</span>
          </div>
          <div className="flex justify-between">
            <span>Fonds</span>
            <span className="font-semibold">{funds.find((f) => f.id === selectedDepositFund)?.name}</span>
          </div>
          <div className="flex justify-between">
            <span>Montant</span>
            <span className="font-semibold">{depositAmount ? formatAmount(Number(depositAmount)) : "0,00 €"}</span>
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
                      selectedDepositFund === fund.id ? "bg-centup-green-dark/10 border border-centup-green-dark/20" : "bg-gray-50 dark:bg-gray-800"
                    }`}
                    onClick={() => {
                      setSelectedDepositFund(fund.id)
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

      {/* Bouton de confirmation */}
      <div className="pt-4 pb-8">
        <Button
          className="w-full bg-centup-green-dark hover:bg-centup-green-dark/90 rounded-2xl h-14 text-lg font-semibold"
          size="lg"
          disabled={!depositAmount || Number(depositAmount) <= 0}
        >
          {depositMode === "deposit" ? (
            <>
              <img src="/images/centup-arrow.png" alt="CentUp" className="h-6 w-6 mr-2" />
              Procéder au paiement
            </>
          ) : (
            <>
              <Wallet className="h-5 w-5 mr-2" />
              Confirmer le retrait
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
