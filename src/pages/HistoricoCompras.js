import React from "react";
import Cabecalho from "../components/Cabeçalho";
import "../styles/historico.css"
import Pedido from "../components/Pedido";

export default function HistoricoCompras() {
  return (
    <div>
      <Cabecalho />
      <main>
        <div className="hist">
        <h1>Histórico de compras</h1>
        <div className="histgrid" > 
          <Pedido />
          <Pedido />
          <Pedido />
          <Pedido />
        </div>
        </div>
      </main>
    </div>
  );
}
