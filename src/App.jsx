import { Routes, Route, BrowserRouter } from "react-router-dom"
import Home from "./pages/home"
import AuthPage from "./pages/auth"
import Error from "./pages/404"
import NewProductPage from "./pages/newProduct"
import RegisterPage from "./pages/auth/register"
import LoginPage from "./pages/auth/login"

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path='/newProduct' element={<NewProductPage />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
