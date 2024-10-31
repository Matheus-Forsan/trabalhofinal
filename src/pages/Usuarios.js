import React from "react";
import "../styles/Usuarios.css";
import Contas from "../components/Usuarios";

export default function Usuarios() {
  return (
    <div>
      <div className="usercontainer">
        <h1>Gestão de Usuarios</h1>
       <p>Visualisação e edição</p>
       <div className="usersgrid">
          <Contas />
          <Contas />
          <Contas />
       </div>
      </div>
    </div>
  );
}
