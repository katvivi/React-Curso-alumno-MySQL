import './App.css';

import { Home } from "./Home";
import { Curso } from "./Curso";
import { Alumno } from "./Alumno";

import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <div className="App container">
      <h3 className="d-flex justify-content-center m-3">React js</h3>

      <nav className="navbar navbar-expand-sm bg-light navdar-dark">
        <ul className="navbar-nav">
          <li className="nav-item m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/home">
              Home
            </NavLink>
          </li>
          <li className="nav-item m-1">
            <NavLink
              className="btn btn-light btn-outline-primary"
              to="/curso"
            >
              Curso
            </NavLink>
          </li>
          <li className="nav-item m-1">
            <NavLink
              className="btn btn-light btn-outline-primary"
              to="/alumno"
            >
              Alumno
            </NavLink>
          </li>
        </ul>

      </nav>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/curso" element={<Curso/>}/>
        <Route path="/alumno" element={<Alumno/>} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
