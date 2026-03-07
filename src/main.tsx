import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {ThemeProvider} from 'next-themes';
import {ThemeProvider} from '@/app/providers/theme-provider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange>
      <ThemeProvider >
        <App />
      </ThemeProvider>
    </ThemeProvider>
  </StrictMode>,
)
