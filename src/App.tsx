import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Router from './routes/Router'
import LayoutProvider from './context/LayoutProvider'
import UserProvider from './context/UserProvider'

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <LayoutProvider>
          <Layout>
            <Router />
          </Layout>
        </LayoutProvider>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
