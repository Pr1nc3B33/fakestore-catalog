import { useState } from 'react'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import appStore from './store/cartStore'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Cart from './components/Cart'
import './App.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 2, refetchOnWindowFocus: false },
  },
})

export default function App() {
  const [page, setPage] = useState('home')

  return (
    <Provider store={appStore}>
      <QueryClientProvider client={queryClient}>
        <div className="app">
          <Navbar page={page} setPage={setPage} />
          {page === 'home' ? <Home /> : <Cart />}
        </div>
      </QueryClientProvider>
    </Provider>
  )
}