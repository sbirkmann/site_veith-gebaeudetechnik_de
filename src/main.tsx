import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app/App'

// IBM Plex: one engineered family. Sans is variable (100–700).
// Mono has no variable cut on Fontsource — load the weights we use.
import '@fontsource-variable/ibm-plex-sans'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'
import '@fontsource/ibm-plex-mono/600.css'
import './styles/main.scss'

// Opt in to scroll reveals only when the browser can actually drive them.
// Until this runs, every .reveal renders fully visible.
if (typeof IntersectionObserver !== 'undefined') {
  document.documentElement.classList.add('js-reveal')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
