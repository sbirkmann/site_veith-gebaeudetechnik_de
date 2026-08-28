import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '../components/layout/Layout'
import { ScrollToTop } from '../components/layout/ScrollToTop'
import { Home } from '../pages/Home'

/* The homepage ships in the initial bundle; everything else is fetched when
   it is first visited. Legal pages are long and rarely read, so they benefit
   most from being split out. */
const Leistungen = lazy(() => import('../pages/Leistungen'))
const LeistungDetail = lazy(() => import('../pages/LeistungDetail'))
const Service = lazy(() => import('../pages/Service'))
const Kundendienst = lazy(() => import('../pages/Kundendienst'))
const Foerderungen = lazy(() => import('../pages/Foerderungen'))
const Seminare = lazy(() => import('../pages/Seminare'))
const Lebensraeume = lazy(() => import('../pages/Lebensraeume'))
const Marken = lazy(() => import('../pages/Marken'))
const Unternehmen = lazy(() => import('../pages/Unternehmen'))
const Referenzen = lazy(() => import('../pages/Referenzen'))
const Karriere = lazy(() => import('../pages/Karriere'))
const Aktuelles = lazy(() => import('../pages/Aktuelles'))
const NewsDetail = lazy(() => import('../pages/NewsDetail'))
const Kontakt = lazy(() => import('../pages/Kontakt'))
const Impressum = lazy(() => import('../pages/Impressum'))
const Datenschutz = lazy(() => import('../pages/Datenschutz'))
const NotFound = lazy(() => import('../pages/NotFound'))

/** Holds the space while a split chunk arrives, so the footer does not jump up. */
function RouteFallback() {
  return <div style={{ minHeight: '70vh' }} aria-hidden="true" />
}

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/leistungen" element={<Leistungen />} />
            <Route path="/leistungen/:slug" element={<LeistungDetail />} />

            <Route path="/service" element={<Service />} />
            <Route path="/service/kundendienst" element={<Kundendienst />} />
            <Route path="/service/foerderungen" element={<Foerderungen />} />
            <Route path="/service/seminare" element={<Seminare />} />
            <Route path="/service/lebensraeume" element={<Lebensraeume />} />
            <Route path="/service/marken" element={<Marken />} />

            <Route path="/unternehmen" element={<Unternehmen />} />
            <Route path="/referenzen" element={<Referenzen />} />
            <Route path="/karriere" element={<Karriere />} />

            <Route path="/aktuelles" element={<Aktuelles />} />
            <Route path="/aktuelles/:slug" element={<NewsDetail />} />

            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  )
}
