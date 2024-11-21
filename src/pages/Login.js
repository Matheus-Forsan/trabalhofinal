import React from "react";
import "../styles/login.css";
import { Link } from "react-router-dom";


export default function Login() {
  return (
    <body className="loginbody">
    <div className="logback">
      <div className="logincont">
        <h1>Faça seu login</h1>
        <hr></hr>
        <div className="loggrid">
          <div>
            <p>Seu email*</p>
            <input type="text"></input>
          </div>
          <div>
            <p>Sua senha*</p>
            <input type="text"></input>
          </div>
          <button className="botaologin"><h1>Entrar</h1></button>
          <p className="naopossui">Não possui um login? <Link to="/registro">Clique aqui</Link> para realizar seu cadastro.</p>
        </div>
      </div>
    </div>
    </body>
  );
}
