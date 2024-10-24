import React from "react";
import "./style.css"

export default function Pedido() {
  return (
    <div>
      <div className="pedido">
             <div className="pd1">
               <h3>Status: A caminho</h3>
               <h4>Data do pedido: 24/10/2024 08:03:53</h4>
             </div>
             <hr className="l1" />
             <div className="pd2">
                <h3>
                  Produtos:
                </h3>
                <div>
                <p>
                  Calça legging - preto, P, Quantidade: 1
                </p>
                <p>Top - preto basico, P, Quantidade: 1</p>
                </div>
                
             </div>
             <hr className="l1" />
             <div className="pd2">
                <h3>
                  Endereço:
                </h3>
                <div>
                <p>
                  CEP: 1000000
                </p>
                <p>
                  Rua: logo ali
                </p>
                <p>
                  bairro: perto de la
                </p>

                </div>
                
             </div>
             <hr className="l1" />
             <div className="pd2">
                <h3>
                  Forma de pagamento:
                </h3>
                <div>
                  <p>
                    Pago via pix.
                  </p>
                </div>
             </div>
             <hr className="l1" />
             <div className="pd2">
                <h3>
                  Valor Total:
                </h3>
                <div>
                  <p>
                    R$119,90
                  </p>
                </div>
             </div>
          </div>
    </div>
  );
}