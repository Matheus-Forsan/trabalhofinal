import React from "react";
import "../styles/registro.css"


export default function Registro() {
  return (
    <body className="loginbody">
    <div className="regback">
      <div className="regcont">
        <h1>Cadastre-se</h1>
        <hr></hr>
        <div className="reggrid">
          <div className="tipo1">
            <p>Nome completo</p>
            <input type="text"></input>
          </div>
          <div className="cont2">
            <div >
            <p>CPF</p>
            <input type="text"></input>
            </div>
            <div >
            <p>Telefone</p>
            <input type="text"></input>
            </div>
          </div>
          <div className="tipo1">
            <p>Email</p>
            <input type="text"></input>
          </div>
          <div className="cont2">
          <div>
            <p>Cidade</p>
            <input type="text"></input>
          </div>
          <div>
            <p>Bairro</p>
            <input type="text"></input>
          </div>
          </div>
          <div className="cont2">
          <div>
            <p>Logradouro</p>
            <input type="text"></input>
          </div>
          <div>
            <p>Complemento</p>
            <input type="text"></input>
          </div>
          </div>
          
          <div className="tipo2">
            <p>Numero</p>
            <input  type="text"></input>
          </div>
          <div className="tipo1">
            <p>Crie uma senha</p>
            <input type="text"></input>
          </div>
          <button className="botaologin"><h1>Cadastrar</h1></button>
          
        </div>
      </div>
    </div>
    </body>
  );
}
