"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Mail, Lock, Eye, EyeOff, User } from "lucide-react"

interface SignupPageProps {
  setActiveTab: (tab: string) => void
}

export function SignupPage({ setActiveTab }: SignupPageProps) {
  const [showManualForm, setShowManualForm] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)

  return (
    <div className="h-full relative">
      {/* Contenu scrollable */}
      <div className="h-full flex flex-col px-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4 pt-8">
          <Button variant="ghost" size="icon" onClick={() => setActiveTab("profile")} className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Inscription</h1>
        </div>

        {/* Logo et nom */}
        <div className="flex-1 flex flex-col justify-center text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <img src="/images/centup-arrow.png" alt="CentUp" className="h-16 w-auto" />
            <h2 className="text-5xl font-bold text-foreground">CentUp</h2>
          </div>
          <p className="text-muted-foreground text-base">Créez votre compte et commencez à investir</p>
        </div>
      </div>

      {/* Buttons section - Fixed at bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-background border-t border-border p-6 space-y-4">
        {/* Connexion avec Google */}
        <div>
          <Button
            variant="outline"
            className="w-full rounded-2xl h-14 text-base bg-transparent border-2 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            S'inscrire avec Google
          </Button>
        </div>

        {!showManualForm ? (
          <>
            {/* Séparateur */}
            <div className="flex items-center gap-4 my-4">
              <div className="flex-1 h-px bg-border"></div>
              <span className="text-sm text-muted-foreground">ou</span>
              <div className="flex-1 h-px bg-border"></div>
            </div>

            {/* Bouton inscription manuelle */}
            <div>
              <Button
                variant="outline"
                className="w-full rounded-2xl h-14 text-base bg-transparent border-2 hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => {}}
              >
                Inscription manuelle
              </Button>
            </div>

            {/* Lien de connexion - Always visible */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="text-muted-foreground text-base">Vous avez déjà un compte ?</span>
                <Button
                  variant="ghost"
                  className="text-centup-green-dark p-0 h-auto font-semibold text-base"
                  onClick={() => setActiveTab("login")}
                >
                  Se connecter
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Séparateur */}
            <div className="flex items-center gap-4 my-4">
              <div className="flex-1 h-px bg-border"></div>
              <span className="text-sm text-muted-foreground">ou</span>
              <div className="flex-1 h-px bg-border"></div>
            </div>

            {/* Formulaire */}
            <div className="space-y-6 mb-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-base font-medium">
                    Prénom
                  </Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Vincent"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="pl-12 rounded-2xl h-14 text-base border-2 focus:border-centup-green-dark"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-base font-medium">
                    Nom
                  </Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="PRÊTRE"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="pl-12 rounded-2xl h-14 text-base border-2 focus:border-centup-green-dark"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="vincent@centup.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 rounded-2xl h-14 text-base border-2 focus:border-centup-green-dark"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-base font-medium">
                  Mot de passe
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 pr-12 rounded-2xl h-14 text-base border-2 focus:border-centup-green-dark"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-base font-medium">
                  Confirmer le mot de passe
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-12 pr-12 rounded-2xl h-14 text-base border-2 focus:border-centup-green-dark"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </Button>
                </div>
              </div>

              <div className="flex items-start space-x-3 pt-2">
                <Checkbox id="terms" checked={acceptTerms} onCheckedChange={setAcceptTerms} className="rounded mt-1" />
                <Label htmlFor="terms" className="text-sm leading-relaxed">
                  J'accepte les{" "}
                  <Button variant="ghost" className="text-centup-green-dark p-0 h-auto font-semibold text-sm">
                    conditions d'utilisation
                  </Button>{" "}
                  et la{" "}
                  <Button variant="ghost" className="text-centup-green-dark p-0 h-auto font-semibold text-sm">
                    politique de confidentialité
                  </Button>
                </Label>
              </div>

              <Button
                className="w-full bg-centup-green-dark hover:bg-centup-green-dark/90 rounded-2xl h-14 text-base font-semibold"
                disabled={!acceptTerms}
              >
                Créer mon compte
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}