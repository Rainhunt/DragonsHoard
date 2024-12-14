import { BrowserRouter } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Router from './routes/Router'
import './App.css'
import LayoutProvider from './context/LayoutProvider'

function App() {
  return (
    <BrowserRouter>
      <LayoutProvider>
        <Layout>
          <Router />
        </Layout>
      </LayoutProvider>
    </BrowserRouter>
  )
}

export default App
