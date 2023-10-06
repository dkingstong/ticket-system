import './App.css';
import SignIn from './pages/SignIn';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './pages/Home'
import CreateTicket from './pages/CreateTicket'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn/>} />
        <Route path="/admin" element={<Home/>} />
        <Route path='/main' element={<CreateTicket/>} />
      </Routes>
    </Router>
  );
}

export default App;
