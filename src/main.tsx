import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const root = document.getElementById('root')!
const service = window.location.pathname.split('/').filter(Boolean)[0]
const app = <StrictMode><App service={service} /></StrictMode>
if (root.querySelector('main')) hydrateRoot(root, app)
else createRoot(root).render(app)
