import React from 'react'
import './App.scss'
import MainRoutes from './routes'
import { Components } from './components'
import axios from 'axios'
import { Pages } from './pages'

axios.defaults.baseURL = 'https://staffcontrolapi.pythonanywhere.com/api'

function App() {
  const token = localStorage.getItem('token')

  if(!token) return <Pages.Login />

  return (
    <div>
      <main>
        <MainRoutes />
      </main>
      
      <footer>
        <Components.Navbar />
      </footer>
      
    </div>
  )
}

export default App