import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login"
import Create from "./components/Create";
import Edit from "./components/Edit";
import Details from "./components/Detail";
import Navbar from "./components/Navbar";
// import { useNavigate } from "react-router"


function App() {
  // let navigate = useNavigate();

  const token = localStorage.getItem('token');

  if(!token){
    return <Login/>
  }

  const handeLogout = () => {
      localStorage.removeItem('token');
      // navigate('/')
  }

  return (
    <>
      {/* <Home /> */}
      <BrowserRouter>
        <div>
          {/* <nav>
            <ul>
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/create">Créer</Link></li>
            </ul>
          </nav> */}
          <Navbar handeLogout={handeLogout} />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/details/:id" element={<Details />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
