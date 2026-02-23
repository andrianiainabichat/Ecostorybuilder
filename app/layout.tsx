import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EcoStoryBuilder - Créez des histoires écologiques',
  description: 'Plateforme interactive pour créer et partager des histoires éducatives sur l\'écologie et le développement durable',
  keywords: ['écologie', 'éducation', 'environnement', 'histoires', 'développement durable'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-eco-dark text-green py-6 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2024 EcoStoryBuilder - Pour un avenir durable</p>
          </div>
        </footer>
      </body>
    </html>
  )
}