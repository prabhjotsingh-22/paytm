import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Signup  from "./pages/signup";
import Dashboard from "./pages/dashboard";
import SendMoney from "./pages/sendmoney";
import SignIn from "./pages/signin";

function App() {
  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App