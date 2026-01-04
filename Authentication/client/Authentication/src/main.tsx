import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ClerkProvider } from '@clerk/clerk-react'

const PUBLISHER_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if(!PUBLISHER_KEY){
  console.error('VITE_CLERK_PUBLISHABLE_KEY is not set')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHER_KEY}>
      <App />
    </ClerkProvider>
  </StrictMode>,
)
