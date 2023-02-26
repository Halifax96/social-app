import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"

import Login from "./login.js";
import UserNav from "./userSignUp";
import Admin from "./administradorVista";
import UserVista from "./usuarioVista";
import Bienvenida from "./bienvenida.js";

export default function App() {
  return (
    <Router>
        <div>
            <Routes>
                <Route path="/" element = {<Navigate to="Bienvenida"/>}/>
                <Route path="/bienvenida" element = {<Bienvenida/>}/>
                <Route path="/Bienvenida/login" element = {<Login/>}/>
                <Route path="/Bienvenida/userSignUp" element = {<UserNav/>}/>
                <Route path="/Bienvenida/login/administradorVista" element = {<Admin/>}/>
                <Route path="/Bienvenida/login/usuarioVista" element = {<UserVista/>}/>
            </Routes>
        </div>
    </Router>
  );
}



