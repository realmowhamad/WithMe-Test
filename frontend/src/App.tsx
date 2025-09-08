import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navigation";

// Placeholder components - you can replace these with your actual components
function Home() {
  return <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
    <Navbar />
    <h1>Welcome to Home Page</h1>
    </div>;
}

function App() {

  return (
    <>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}  />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
