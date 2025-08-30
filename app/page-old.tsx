"use client"

import { useState } from "react"
import { ThemeProvider } from "../contexts/theme-context"
import { MainAppLayout } from "../components/layouts/main-app-layout"

// Import des pages
import { HomePage } from "../components/pages/home-page"
import { PerformancePage } from "../components/pages/performance-page"
import { DepositPage } from "../components/pages/deposit-page"
import { ActivityPage } from "../components/pages/activity-page"
import { ProfilePage } from "../components/pages/profile-page"
import { MissionsPage } from "../components/pages/missions-page"
import { LoginPage } from "../components/pages/login-page"
import { SignupPage } from "../components/pages/signup-page"

function CentUpAppContent() {
  const [activeTab, setActiveTab] = useState("home")
  const [depositMode, setDepositMode] = useState<"deposit" | "withdraw">("deposit")

  const renderCurrentPage = () => {
    switch (activeTab) {
      case "home":
        return <HomePage setActiveTab={setActiveTab} setDepositMode={setDepositMode} />
      case "performance":
        return <PerformancePage />
      case "deposit":
        return <DepositPage depositMode={depositMode} setDepositMode={setDepositMode} />
      case "activity":
        return <ActivityPage />
      case "profile":
        return <ProfilePage setActiveTab={setActiveTab} />
      case "missions":
        return <MissionsPage setActiveTab={setActiveTab} />
      case "login":
        return <LoginPage setActiveTab={setActiveTab} />
      case "signup":
        return <SignupPage setActiveTab={setActiveTab} />
      default:
        return <HomePage setActiveTab={setActiveTab} setDepositMode={setDepositMode} />
    }
  }

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // Ici on pourrait ajouter la logique d'envoi du message
      setChatMessage("")
    }
  }

  const NavBar = () => (
    <div className="bg-background border-t border-border">
      <div className="flex justify-around py-3">
        {[
          { id: "home", icon: Home, label: "Accueil" },
          { id: "performance", icon: TrendingUp, label: "Performance" },
          { id: "deposit", icon: PlusCircle, label: "Déposer" },
          { id: "activity", icon: Activity, label: "Activités" },
          { id: "profile", icon: User, label: "Profil" },
        ].map((tab) => (
          <Button
            key={tab.id}
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
              activeTab === tab.id ? "text-centup-green-dark" : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon className={`h-5 w-5 ${activeTab === tab.id ? "stroke-2" : ""}`} />
            <span className="text-xs">{tab.label}</span>
          </Button>
        ))}
      </div>
    </div>
  )

  const ChatBot = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      {/* Bouton chatbot flottant */}
      <Button
        onClick={() => setShowChat(!showChat)}
        className={`${
          isMobile ? "fixed" : "absolute"
        } bottom-24 right-4 w-14 h-14 rounded-full bg-centup-green-dark hover:bg-centup-green-dark/90 shadow-lg z-50 flex items-center justify-center`}
        size="icon"
      >
        {showChat ? <X className="h-6 w-6 text-white" /> : <MessageCircle className="h-6 w-6 text-white" />}
      </Button>

      {/* Fenêtre de chat */}
      {showChat && (
        <div
          className={`${
            isMobile ? "fixed bottom-44 left-4 right-4" : "absolute bottom-44 right-4 w-80"
          } h-96 bg-background rounded-3xl shadow-xl border border-border z-50 flex flex-col`}
        >
          {/* Header du chat */}
          <div className="flex justify-between items-center p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-centup-green-dark rounded-full flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Assistant CentUp</h3>
                <p className="text-xs text-muted-foreground">En ligne</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setShowChat(false)} className="rounded-full w-8 h-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Zone de messages */}
          <div className="flex-1 p-4 overflow-y-auto scrollbar-hide">
            <div className="space-y-4">
              {/* Message de bienvenue */}
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-centup-green-dark rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-3 w-3 text-white" />
                </div>
                <div className="bg-muted/50 rounded-2xl rounded-tl-sm p-3 max-w-[200px]">
                  <p className="text-sm">Bonjour Vincent ! 👋</p>
                  <p className="text-sm mt-1">Comment puis-je vous aider aujourd'hui ?</p>
                </div>
              </div>

              {/* Suggestions rapides */}
              <div className="flex flex-col gap-2">
                <p className="text-xs text-muted-foreground px-3">Suggestions :</p>
                {["💰 Voir mes performances", "📊 Analyser mon portefeuille", "🎯 Conseils d'investissement"].map(
                  (suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs h-8 rounded-2xl justify-start bg-transparent hover:bg-centup-green-dark/5"
                      onClick={() => setChatMessage(suggestion.split(" ").slice(1).join(" "))}
                    >
                      {suggestion}
                    </Button>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Zone de saisie */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Tapez votre message..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 text-sm rounded-2xl border-muted"
              />
              <Button
                size="sm"
                onClick={handleSendMessage}
                disabled={!chatMessage.trim()}
                className="bg-centup-green-dark hover:bg-centup-green-dark/90 rounded-2xl px-4"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )

  // Masquer la navbar et le chatbot pour les pages login/signup/missions
  const hideNavigation = ["login", "signup", "missions"].includes(activeTab)

  return (
    <div className="min-h-screen bg-background md:bg-gray-100 md:dark:bg-gray-900 md:flex md:items-center md:justify-center md:p-8">
      {/* Version mobile native (sm et en dessous) */}
      <div className="md:hidden w-full min-h-screen bg-background flex flex-col">
        {/* Contenu scrollable */}
        <div
          className={`flex-1 overflow-y-auto scrollbar-hide ${hideNavigation ? "" : "pb-20"}`}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div className={hideNavigation ? "" : "px-4 pt-8"}>{renderCurrentPage()}</div>
        </div>

        {/* Navigation bar fixe en bas */}
        {!hideNavigation && (
          <div className="fixed bottom-0 left-0 right-0 z-40">
            <NavBar />
          </div>
        )}

        {/* Chatbot mobile */}
        {!hideNavigation && <ChatBot isMobile={true} />}
      </div>

      {/* Version desktop avec cadre iPhone (md et au-dessus) */}
      <div className="hidden md:block relative">
        <div className="w-[400px] h-[800px] bg-black rounded-[60px] p-2 shadow-2xl">
          <div className="w-full h-full bg-background rounded-[50px] overflow-hidden relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-50"></div>

            {/* Zone de contenu avec scroll personnalisé */}
            <div className="w-full h-full flex flex-col">
              {/* Contenu scrollable */}
              <div
                className="flex-1 overflow-y-auto scrollbar-hide"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <div className={hideNavigation ? "" : "px-4 pt-8 pb-24"}>{renderCurrentPage()}</div>
              </div>

              {/* Navigation bar fixe */}
              {!hideNavigation && (
                <div className="absolute bottom-0 left-0 right-0 z-40">
                  <NavBar />
                </div>
              )}

              {/* Chatbot desktop */}
              {!hideNavigation && <ChatBot isMobile={false} />}
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full"></div>
      </div>
    </div>
  )
}

export default function CentUpApp() {
  return (
    <ThemeProvider>
      <CentUpAppContent />
    </ThemeProvider>
  )
}
