import React, { useContext } from "react";
import { useNavigate } from "react-router-dom"; // Importando o hook useNavigate
import { AuthContext } from "../../contexts/AuthContext";

export default function Produtoicone({ 
  nomeproduto, 
  preco, 
  imagem, 
  detalhe, 
  carinho, 
  idProduto // Recebendo o id do produto
}) {
  const { user } = useContext(AuthContext); // Acessando o contexto para obter as informações do usuário
  const navigate = useNavigate(); // Hook para navegação

  const editarProduto = () => {
    // Redireciona para a página de edição do produto específico
    navigate(`/admin/produtos/${idProduto}`); // A rota de edição do produto
  };

  return (
    <div className="producticon" onClick={detalhe}>
      <div className="imgproduct">
        <img src={imagem} alt={nomeproduto} />
      </div>
      <div className="loucura2">
        <h4>{nomeproduto}</h4>
        <h4>R${preco}</h4>
      </div>

      {user?.role === "ADMIN" ? (
        // Se o usuário for ADMIN, exibe o botão "Editar"
        <button
          onClick={(e) => {
            e.stopPropagation(); // Evita que o clique no botão de editar redirecione a página
            editarProduto(); // Função de editar produto
          }}
        >
          Editar
        </button>
      ) : (
        // Se o usuário for USER, exibe o botão "Adicionar ao Carrinho"
        <button
          onClick={(e) => {
            e.stopPropagation(); // Para evitar propagação do clique
            carinho(e); // Passando o evento para a função carinho
          }}
        >
          Adicionar ao Carrinho
        </button>
      )}
    </div>
  );
}
