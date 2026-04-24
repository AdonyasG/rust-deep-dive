import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RustDeepDive from './RustDeepDive.jsx'
import './index.css'

// Shim Claude's window.storage API onto localStorage so the artifact component
// runs unchanged outside the Claude environment.
if (typeof window !== 'undefined' && !window.storage) {
  window.storage = {
    get: async (key) => {
      const v = localStorage.getItem(key)
      return v === null ? null : { key, value: v, shared: false }
    },
    set: async (key, value) => {
      localStorage.setItem(key, String(value))
      return { key, value, shared: false }
    },
    delete: async (key) => {
      const existed = localStorage.getItem(key) !== null
      localStorage.removeItem(key)
      return { key, deleted: existed, shared: false }
    },
    list: async (prefix = '') => {
      const keys = []
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i)
        if (k && k.startsWith(prefix)) keys.push(k)
      }
      return { keys, prefix, shared: false }
    },
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode><RustDeepDive /></StrictMode>
)