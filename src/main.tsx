import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  
  <StrictMode>
          <div className='absolute w-screen top-0 h-[10px] bg-indigo-500 blur-2xl xl:hidden'></div>
      <div className='absolute w-screen bottom-0 h-[5px] bg-indigo-400 blur-2xl xl:hidden'></div>

    <App />

  </StrictMode>,
)
