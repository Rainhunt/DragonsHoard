import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import Layout from "./layout/Layout";
import UserProvider from "./context/UserProvider";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.MODE === "production" ? "/DragonsHoard" : "/"}>
      <UserProvider>
        <Layout>
          <Router />
        </Layout>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
