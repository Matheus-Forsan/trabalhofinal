import React from "react";
import Cabecalho from "../components/Cabeçalho";
import "../styles/perfil.css"
import { Link } from "react-router-dom";

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
      <Cabecalho />
      <div className="perfil">
        <h1>Perfil do Usuario</h1>
      </div>
      <div className="perfilcontainer">
    <div className="perfilgrid">
      <div className="part1">
        <div className="icone">
          <img className="profileimg"/>
        </div>
        <button>Editar</button>
        <button>Sair da conta</button>
      </div>
      <div className="perfilinfo">
        <h1>Nome: {nome}</h1>
        <h1>Email: {email}</h1>
        <h1>Contato: {contato}</h1>
        <h1>CPF: {cpf}</h1>
        <h1>Endereço: { cep}, {cidade}, {bairro}, {logr}, {bairro}, {comp}, {numero}</h1>
       
      </div>
      <Link className="historico" to="/historico-compras"><h1>+ Historico de compras</h1></Link>
      </div>
      
      </div>
    </div>
  );
}
