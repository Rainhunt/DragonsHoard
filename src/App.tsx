import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import Layout from "./layout/Layout";
import UserProvider from "./context/UserProvider";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Layout>
          <Router />
        </Layout>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
