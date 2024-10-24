import React from "react";
import Cabecalho from "../components/Cabeçalho";
import "../styles/Carrinho.css"
import { FaTrashAlt } from "react-icons/fa";



export default function Carrinho() {
  return (
    <div>
      <Cabecalho />
      <div className="Carrinho">
        <div className="Cargrid">
          <div className="carprod">
            <div className="carimg">
              <img />
            </div>
            <div>
            <h3>Calça legging preta básica</h3>
            <h2>R$59.90</h2>
            </div>
            <input type="number" min="1" max="5"/>
           
            <FaTrashAlt size="30"/>

          </div>
          <div className="carprod">
            <div className="carimg">
              <img />
            </div>
            <div>
            <h3>Calça legging preta básica</h3>
            <h2>R$59.90</h2>
            </div>
            <input type="number" min="1" max="5"/>
           
            <FaTrashAlt size="30"/>

          </div>
        </div>
        <div className="finalizar">
          <div className="opciones">
            <div className="fin1">
            <h2>Selecione uma forma de pagamento:</h2>
            <select >
              <option>Pix</option>
              <option>Cartão</option>
              <option>Boleto</option>
            </select  >
            </div>
            <div className="fin2">
            <h2>Endereço registrado:</h2>
            <h3>XXXXXXXXXXXXXXXXX</h3>
            <input type="button" value="Alterar" / >
            </div>
          </div>
          <div>
            <h1>Total: 299.90</h1>
            <input type="button" className="botaocompra" value="finalizar compra" />
            </div>
        </div>
      </div>
    </div>
  );
}
