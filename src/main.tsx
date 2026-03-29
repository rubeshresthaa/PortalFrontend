import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { store } from './store/store'
import './index.css'
import App from './App'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Toaster position="top-right" toastOptions={{
        style: {
          background: '#ffffff',
          color: '#1e293b',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          fontSize: '14px',
          fontWeight: '500',
        }
      }} />
    </Provider>
  </StrictMode>,
)
