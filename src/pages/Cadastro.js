import React from "react";
import "../styles/login.css";
import { Link } from "react-router-dom";


export default function Cadastro() {
  return (
    <div>
      <div>
        <h1>Cadastro de Produtos</h1>
        <div>
          <h2>Nome do Produto</h2>
          <input type="text"></input>
        </div>
        <div>
          <h2>Estoque</h2>
          <input type="Number"></input>
        </div>
        <div>
          <h2>Descrição</h2>
          <input type="text"></input>
        </div>
        <div>
          <h2>Preço</h2>
          <input type="number"></input>
        </div>
     </div>
    </div>
  );
}