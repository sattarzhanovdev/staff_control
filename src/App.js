import React from 'react'
import './App.scss'
import MainRoutes from './routes'
import { Components } from './components'

function App() {
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