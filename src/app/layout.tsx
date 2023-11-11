import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './Navbar/Navbar'
import Footer from './Footer'
import SessionProvider from "./SessionProvider"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Horizon',
  description: 'Modern shopping is here !',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Navbar/>
          <main className='p-4 max-w-7xl min-w-[400px] m-auto'>
          {children}
          </main>
          <Footer/>
        </SessionProvider>
        </body>
    </html>
  )
}
