import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Api from '../src/api/api'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Api />
  </StrictMode>,
)
