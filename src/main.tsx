import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app/App'

// Variable fonts, loaded as woff2 with only the weights actually used.
import '@fontsource-variable/archivo'
import '@fontsource-variable/inter'
import '@fontsource-variable/jetbrains-mono'
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
