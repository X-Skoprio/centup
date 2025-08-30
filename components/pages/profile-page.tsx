"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "../../contexts/theme-context"
import { User, Trophy, Target, CreditCard, Shield, Lock, HelpCircle, ChevronRight, Moon, Sun } from "lucide-react"

interface ProfilePageProps {
  setActiveTab: (tab: string) => void
}

export function ProfilePage({ setActiveTab }: ProfilePageProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="space-y-6 pb-20 pt-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">Profil</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-2xl text-foreground hover:bg-muted"
        >
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>
      </div>

      {/* Boutons temporaires pour la démo */}
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1 rounded-2xl bg-transparent" onClick={() => setActiveTab("login")}>
          Connexion (Demo)
        </Button>
        <Button variant="outline" className="flex-1 rounded-2xl bg-transparent" onClick={() => setActiveTab("signup")}>
          Inscription (Demo)
        </Button>
      </div>

      {/* Informations utilisateur */}
      <Card className="rounded-3xl shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-centup-green-dark rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Vincent PRÊTRE</h2>
              <p className="text-muted-foreground">vincent@centup.com</p>
              <Badge className="mt-1 bg-centup-green-light rounded-full">Niveau 3</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expérience de compte */}
      <Card className="rounded-3xl shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-orange-500" />
            Expérience
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Niveau actuel</span>
            <span className="font-bold">3</span>
          </div>
          <Progress value={65} />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>65% vers le niveau 4</span>
            <span>350/500 XP</span>
          </div>
          <Button
            variant="outline"
            className="w-full bg-transparent rounded-2xl"
            onClick={() => setActiveTab("missions")}
          >
            <Target className="h-4 w-4 mr-2" />
            Voir les missions
          </Button>
        </CardContent>
      </Card>

      {/* Gestion du compte */}
      <div className="space-y-3">
        <h3 className="font-semibold text-foreground">Gestion du compte</h3>

        <Card className="rounded-3xl shadow-sm">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <span>Moyens de paiement</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <span>Sécurité</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                  <span>Confidentialité</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
                  <span>Centre d'aide</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Paramètres */}
      <Card className="rounded-3xl shadow-sm">
        <CardHeader>
          <CardTitle>Paramètres</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Mode sombre</span>
            <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} className="rounded-2xl" />
          </div>
          <div className="flex items-center justify-between">
            <span>Notifications push</span>
            <Switch defaultChecked className="rounded-2xl" />
          </div>
          <div className="flex items-center justify-between">
            <span>Arrondi automatique</span>
            <Switch defaultChecked className="rounded-2xl" />
          </div>
        </CardContent>
      </Card>

      {/* Bouton de déconnexion */}
      <div className="text-center pt-4">
        <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20">
          Se déconnecter
        </Button>
      </div>
    </div>
  )
}
