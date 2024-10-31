import React from "react";

export default function Perfil() {

 const nome = "andre"
 const email = "andre"
 const contato = "55 16 99123-4567"
 const cpf = "555.555.555-55"
 const cep = "14860000"
 const cidade = "varginha"
 const bairro = "andre"
 const comp = "andre"
 const numero = "1234"
 const logr = "andre"

  return (
    <div>
      <div className="perfil">
        <h1>Perfil do Usuario</h1>
      </div>
      <div>
        <div className="icone">
          <img/>
        </div>
        <button>Editar</button>
        <button>Sair da conta</button>
      </div>
      <div>
        <h1>Nome: {nome}</h1>
        <h1>Email: {email}</h1>
        <h1>Contato: {contato}</h1>
        <h1>CPF: {cpf}</h1>
        <h1>Endereço: { cep}, {cidade}, {bairro}, {logr}, {bairro}, {comp}, {numero}</h1>
       
      </div>
    </div>
  );
}
