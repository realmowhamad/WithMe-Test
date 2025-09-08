import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./pages/Login";

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
        </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
