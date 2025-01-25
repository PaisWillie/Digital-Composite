import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import App from 'components/App'
import { HeroUIProvider } from '@heroui/react'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <HeroUIProvider>
    <App />
  </HeroUIProvider>
)
