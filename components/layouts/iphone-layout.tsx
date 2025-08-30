"use client"

import { Badge } from "@/components/ui/badge"
import { Building2, Smartphone, FileText, User, Users, Shield } from "lucide-react"

interface IPhoneLayoutProps {
  children: React.ReactNode
}

export function IPhoneLayout({ children }: IPhoneLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      {/* Version mobile (md et en-dessous) */}
      <div className="md:hidden w-full h-screen">
        {children}
      </div>

      {/* Version desktop avec cadre iPhone (md et au-dessus) */}
      <div className="hidden md:flex items-center justify-center gap-16">
        {/* Panel d'informations de présentation */}
        <div className="max-w-sm space-y-6">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Building2 className="h-6 w-6 text-blue-600" />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Client</span>
                <Badge variant="secondary" className="w-fit text-base font-bold">CentUp</Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Smartphone className="h-6 w-6 text-purple-600" />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Projet</span>
                <Badge variant="outline" className="w-fit">Maquette Application Mobile</Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-green-600" />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Rendu Final</span>
                <Badge variant="default" className="w-fit">Figma + Version interactive</Badge>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-5">
            <div className="flex items-center gap-3">
              <User className="h-6 w-6 text-orange-600" />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Fait par</span>
                <Badge variant="secondary" className="w-fit font-semibold">Hanay JOUD</Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-cyan-600" />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">En collaboration avec</span>
                <Badge variant="outline" className="w-fit">Benjamin BRUNEAU</Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-red-600" />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Sous la supervision de</span>
                <Badge variant="default" className="w-fit font-semibold">JEECE</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* iPhone Container */}
        <div className="relative">
          <div className="w-[400px] h-[800px] bg-black rounded-[60px] p-2 shadow-2xl">
            <div className="w-full h-full bg-background rounded-[50px] overflow-hidden relative">
              {/* Notch iPhone */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-50"></div>

              {/* Contenu iPhone */}
              <div className="w-full h-full">
                {children}
              </div>
            </div>
          </div>
          
          {/* Home indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  )
}