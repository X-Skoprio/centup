"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
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

  // Pages qui n'ont pas besoin de navigation
  const pagesWithoutLayout = ["login", "signup"]
  const hideNavigation = ["login", "signup"].includes(activeTab)

  if (pagesWithoutLayout.includes(activeTab)) {
    return renderCurrentPage()
  }

  return (
    <MainAppLayout 
      hideNavigation={hideNavigation}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {renderCurrentPage()}
        </motion.div>
      </AnimatePresence>
    </MainAppLayout>
  )
}

export default function Page() {
  return (
    <ThemeProvider>
      <CentUpAppContent />
    </ThemeProvider>
  )
}