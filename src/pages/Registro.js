import React from "react";


export default function Registro() {
  return (
    <body>
    <div className="logback">
      <div className="logincont">
        <h1>Cadastre-se</h1>
        <div className="loggrid">
          <div>
            <p>Nome completo</p>
            <input type="text"></input>
          </div>
          <div>
            <p>CPF</p>
            <input type="text"></input>
          </div>
          <div>
            <p>Telefone</p>
            <input type="text"></input>
          </div>
          <div>
            <p>Email</p>
            <input type="text"></input>
          </div>
          <div>
            <p>Cidade</p>
            <input type="text"></input>
          </div>
          <div>
            <p>Bairro</p>
            <input type="text"></input>
          </div>
          <div>
            <p>Logradouro</p>
            <input type="text"></input>
          </div>
          <div>
            <p>Complemento</p>
            <input type="text"></input>
          </div>
          <div>
            <p>Numero</p>
            <input type="text"></input>
          </div>
          <div>
            <p>Crie uma senha</p>
            <input type="text"></input>
          </div>
          <button>Entrar</button>
          
        </div>
      </div>
    </div>
    </body>
  );
}
