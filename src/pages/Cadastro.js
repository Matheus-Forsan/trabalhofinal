import React from "react";
import "../styles/cadastro.css";
import { Link } from "react-router-dom";


export default function Cadastro() {
  return (
    <div className="cadastrocontainer">
      <div className="cadastro">
       <div className="cadastrogrid">
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
        <div>
          <div className="imgcadastro">
          </div>
          <h4>Selecione uma imagem</h4>
          <input type="file" />
        </div>
        </div>
        <button>Cadastrar produto</button>
     </div>
    </div>
  );
}