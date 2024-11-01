import React from "react";
import Cabecalho from "../components/Cabeçalho";
import leg from "../assets/images/legpreta.jpeg.png"

import "../styles/detalhes.css"



export default function DetalhesProduto() {
  return (
    <div>
      <Cabecalho />
      
        <div className="produtogrid">
        <div className="imagemproduto">
            <img src={leg} className="imagemproduto"/>
        </div>
        <div className="produtoinfo">
          <h1>Calça legging - preta simples</h1>
          <div className="av">
          <h3>Avaliações: </h3><p>4,6</p>
          </div>
          <div className="price">
          <h2>R$59,90</h2>
          </div>
          <div className="est">
            <h3>Em estoque:12</h3>
          </div>
          <div className="size">
            <h2>Tamanho:</h2>
            <select>
              <option>P</option>
              <option>M</option>
              <option>G</option>
            </select>
          </div>
          <div className="size">
            <h2>Quantidade:</h2>
            <select>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <div className="bd"> 
          <button className="addtocart" onClick={() => alert("onclick oooo")}>
            <h2>Adicionar ao carrinho</h2>
          </button>
          </div>
        </div>
        </div>
    </div>
  );
}
