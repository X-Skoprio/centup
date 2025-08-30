"use client"

import { NavBar } from "../ui/nav-bar"
import { ChatBot } from "../ui/chat-bot"

interface MainAppLayoutProps {
  children: React.ReactNode
  hideNavigation?: boolean
  activeTab?: string
  setActiveTab?: (tab: string) => void
}

export function MainAppLayout({ 
  children, 
  hideNavigation = false, 
  activeTab = "home", 
  setActiveTab = () => {} 
}: MainAppLayoutProps) {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Zone de contenu avec scroll personnalisé */}
      <div
        className="flex-1 overflow-y-auto scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className={hideNavigation ? "" : "px-4 pt-8 pb-24"}>
          {children}
        </div>
      </div>

      {/* Navigation bar fixe */}
      {!hideNavigation && (
        <div className="absolute bottom-0 left-0 right-0 z-40">
          <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      )}

      {/* Chatbot */}
      {!hideNavigation && <ChatBot isMobile={false} />}
    </div>
  )
}