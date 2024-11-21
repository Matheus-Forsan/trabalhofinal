import React from "react";
import Cabecalho from "../components/Cabeçalho";
import "../styles/Produtos.css"
import Produtoicone from "../components/Produtoicone";
import Rodape from "../components/Footerdosite";

export default function Produtos() {
  return (
    <div>
      <Cabecalho />
      
      <div className="productcontainer">
        <div className="productgrid">
        <Produtoicone />
        <Produtoicone />
        <Produtoicone />
        <Produtoicone />
        <Produtoicone />
        <Produtoicone />
        <Produtoicone />
        <Produtoicone />
        </div>
      </div>
      <Rodape />
    </div>
  );
}
