import './globals.css'
import type { Metadata, Viewport } from 'next'

import { ApolloWrapper } from '@/lib/graphql/ApolloWrapper'
import Header from '@/components/Header'
import CustomThemeProvider from '@/providers/CustomThemeProvider'
import AuthGuard from '@/components/AuthGuard'
import { ModalProvider } from '@/providers/modalProvider'
import ToastProvider from '@/providers/ToastProvider'
import { Separator } from '@/components/ui/separator'
import { Toaster } from "@/components/ui/sonner"

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'CES',
  description: 'customer engagement enterprise',
}

export const viewport: Viewport = {
  width: 'device-width',
  maximumScale: 3,
  minimumScale: 0.5,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="facebook-domain-verification" content="ar0ijriacdyy0d4d40r6c1090wmn23" />
      </head>
      <body className="h-screen text-slate-800 dark:text-slate-200  dark:bg-black my-0 font-sans">
          <CustomThemeProvider>
            <ApolloWrapper>
              <AuthGuard>
                  <main className='flex flex-col h-full relative '>
                    <Header />
                    <Separator />
                    <div className='flex-1 overflow-hidden'>
                      {children}
                    </div>
                      <ToastProvider />
                      <Toaster />
                      <ModalProvider />
                  </main>
              </AuthGuard>
            </ApolloWrapper>
          </CustomThemeProvider>
      </body>
    </html>
  )
}
