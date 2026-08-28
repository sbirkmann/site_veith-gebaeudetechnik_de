import type { ReactNode } from 'react'
import { Header } from '../navigation/Header'
import { FloatingContact } from '../navigation/FloatingContact'
import { Footer } from './Footer'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#inhalt">
        Zum Inhalt springen
      </a>
      <Header />
      <FloatingContact />
      <main id="inhalt" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  )
}
