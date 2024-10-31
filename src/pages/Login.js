import React from "react";
import "../styles/login.css";
import { Link } from "react-router-dom";


export default function Login() {
  return (
    <body>
    <div className="logback">
      <div className="logincont">
        <h1>Faça seu login</h1>
        <div className="loggrid">
          <div>
            <p>insira seu email</p>
            <input type="text"></input>
          </div>
          <div>
            <p>insira sua senha</p>
            <input type="text"></input>
          </div>
          <button>Entrar</button>
          <p>Não possui um login?<Link to="/registro">Clique aqui</Link> para realizar seu cadastro.</p>
          
        </div>
      </div>
    </div>
    </body>
  );
}
