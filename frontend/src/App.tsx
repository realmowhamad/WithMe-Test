import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Placeholder components - you can replace these with your actual components
function Home() {
  return <div>Welcome to Home Page</div>;
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
