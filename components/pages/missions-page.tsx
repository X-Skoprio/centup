"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Trophy, Target, Star, Gift } from "lucide-react"
import { achievements } from "../../data/mockData"

interface MissionsPageProps {
  setActiveTab: (tab: string) => void
}

export function MissionsPage({ setActiveTab }: MissionsPageProps) {
  const completedAchievements = achievements.filter((a) => a.completed)
  const inProgressAchievements = achievements.filter((a) => !a.completed)
  const totalXP = achievements.filter((a) => a.completed).reduce((sum, a) => sum + a.reward, 0)

  return (
    <div className="space-y-6 pb-20 pt-4 px-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => setActiveTab("profile")} className="rounded-full">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-foreground">Missions</h1>
      </div>

      {/* Statistiques */}
      <div className="space-y-4">
        <Card className="rounded-3xl bg-orange-50/50 dark:bg-orange-950/20 border-orange-200/50 dark:border-orange-800/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Missions complétées</p>
                  <p className="text-xl font-bold text-orange-600">{completedAchievements.length}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl bg-blue-50/50 dark:bg-blue-950/20 border-blue-200/50 dark:border-blue-800/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Missions en cours</p>
                  <p className="text-xl font-bold text-blue-600">{inProgressAchievements.length}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl bg-centup-green-light/20 border-centup-green-light/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-centup-green-light/30 rounded-2xl flex items-center justify-center">
                  <Star className="h-6 w-6 text-centup-green-dark" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">XP Total</p>
                  <p className="text-xl font-bold text-centup-green-dark">{totalXP}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Missions en cours */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">En cours</h2>
        {inProgressAchievements.map((achievement) => (
          <Card key={achievement.id} className="rounded-3xl shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-muted/30 rounded-2xl flex items-center justify-center">
                    <Target className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progression</span>
                        <span className="font-medium">
                          {achievement.progress}/{achievement.maxProgress}
                        </span>
                      </div>
                      <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                    </div>
                  </div>
                </div>
                <Badge variant="secondary" className="rounded-full whitespace-nowrap">
                  +{achievement.reward} XP
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Missions complétées */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Complétées</h2>
        {completedAchievements.map((achievement) => (
          <Card
            key={achievement.id}
            className="rounded-3xl shadow-sm bg-green-50/50 dark:bg-green-950/20 border-green-200/50 dark:border-green-800/50"
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center">
                    <Trophy className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500 rounded-full whitespace-nowrap">
                    <Gift className="h-3 w-3 mr-1" />+{achievement.reward} XP
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
