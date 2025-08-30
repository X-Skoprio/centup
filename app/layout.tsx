import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { IPhoneLayout } from '../components/layouts/iphone-layout'
import './globals.css'

export const metadata: Metadata = {
  title: 'Maquette CentUp',
  description: 'Créé par Hanay Joud en collaboration avec la JEECE',
  creator: 'Hanay Joud',
  authors: [
    { name: 'Hanay Joud' },
    { name: 'JEECE' }
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>

          {children}

      </body>
    </html>
  )
}
