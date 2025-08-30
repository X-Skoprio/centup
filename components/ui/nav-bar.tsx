"use client"

import { Button } from "@/components/ui/button"
import { Home, TrendingUp, HandCoins, Activity, User } from "lucide-react"

interface NavBarProps {
  activeTab?: string
  setActiveTab?: (tab: string) => void
}

export function NavBar({ activeTab = "home", setActiveTab = () => {} }: NavBarProps) {
  const tabs = [
    { id: "home", icon: Home, label: "Accueil" },
    { id: "performance", icon: TrendingUp, label: "Fonds" },
    { id: "deposit", icon: HandCoins, label: "Déposer" },
    { id: "activity", icon: Activity, label: "Activités" },
    { id: "profile", icon: User, label: "Profil" },
  ]

  return (
    <div className="relative">
      {/* Bouton flottant */} 
      <div className="absolute left-1/2 transform -translate-x-1/2 -top-4 z-50">
        <Button
          variant="ghost"
          size="sm"
          className="w-16 h-16 bg-centup-green-dark rounded-full shadow-xl border-4 border-white dark:border-gray-900 flex items-center justify-center transition-all duration-300 hover:scale-110"
          onClick={() => setActiveTab("deposit")}
        >
          <HandCoins className="h-7 w-7 stroke-2 text-white" />
        </Button>
      </div>

      {/* Navbar avec découpe en utilisant une technique de masque */}
      <div className="relative">
        <div className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-md rounded-t-3xl shadow-lg border border-white/20 dark:border-gray-700/30 relative">
          {/* Masque circulaire pour créer la découpe */}
          <div 
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-10 -mt-1 hidden dark:block"
            style={{
              background: 'radial-gradient(ellipse 40px 20px at 50% 100%, transparent 70%, rgb(17 24 39 / 0.9) 71%)'
            }}
          ></div>
          <div 
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-10 -mt-1 block dark:hidden"
            style={{
              background: 'radial-gradient(ellipse 40px 20px at 50% 100%, transparent 70%, white/80 71%)'
            }}
          ></div>
          
          <div className="flex items-center justify-around px-6 py-3 pt-4 relative">
            {tabs.map((tab, index) => {
              const isDeposit = tab.id === "deposit"
              const isActive = activeTab === tab.id
              
              if (isDeposit) {
                // Espace vide pour le bouton central
                return <div key={tab.id} className="w-16 flex-shrink-0"></div>
              }
              
              return (
                <Button
                  key={tab.id}
                  variant="ghost"
                  size="sm"
                  className={`flex flex-col items-center gap-1 h-auto py-1 px-3 transition-all duration-200 ${
                    isActive ? "text-centup-green-dark" : "text-gray-400"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon className={`h-5 w-5 ${isActive ? "stroke-2" : "stroke-1.5"}`} />
                  <span className="text-xs font-medium">{tab.label}</span>
                </Button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}