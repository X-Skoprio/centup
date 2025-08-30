"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, X } from "lucide-react"

interface ChatBotProps {
  isMobile?: boolean
}

export function ChatBot({ isMobile = false }: ChatBotProps) {
  const [showChat, setShowChat] = useState(false)
  const [chatMessage, setChatMessage] = useState("")

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // Ici on pourrait ajouter la logique d'envoi du message
      setChatMessage("")
    }
  }

  return (
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

      {/* Interface de chat */}
      {showChat && (
        <div
          className={`${
            isMobile ? "fixed" : "absolute"
          } bottom-44 right-4 w-80 h-96 bg-background border border-border rounded-2xl shadow-xl z-40 flex flex-col`}
        >
          {/* Header du chat */}
          <div className="p-4 border-b border-border rounded-t-2xl bg-centup-green-dark">
            <h3 className="font-semibold text-white">Assistant CentUp</h3>
            <p className="text-xs text-white/70">Comment puis-je vous aider ?</p>
          </div>

          {/* Zone de messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-3">
              <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                <p className="text-sm">
                  Bonjour ! Je suis votre assistant CentUp. Comment puis-je vous aider aujourd'hui ?
                </p>
              </div>
            </div>
          </div>

          {/* Zone de saisie */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                placeholder="Tapez votre message..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 rounded-xl"
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="bg-centup-green-dark hover:bg-centup-green-dark/90 rounded-xl"
              >
                Envoyer
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}