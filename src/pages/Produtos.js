import React, { useState, useEffect, useContext } from "react";
import Cabecalho from "../components/Cabeçalho";
import "../styles/Produtos.css";
import Produtoicone from "../components/Produtoicone";
import Rodape from "../components/Footerdosite";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // Certifique-se de que o arquivo está configurado corretamente
import { AuthContext } from "../contexts/AuthContext";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // Estado para capturar erros
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Pega o usuário logado

  // Buscar produtos ao montar o componente
  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const isAdmin = user?.role === "ADMIN"; // Verifica se o usuário é administrador
        const response = await api.get(`/produtos?admin=${isAdmin}`); // Rota com parâmetro para admin
        setProdutos(response.data);
      } catch (error) {
        if (error.response?.data?.message) {
          setError(error.response.data.message); // Exibe a mensagem de erro da API
        } else {
          setError("Erro desconhecido. Por favor, tente novamente.");
        }
      } finally {
        setLoading(false); // Finaliza o estado de carregamento
      }
    };

    fetchProdutos();
  }, [user?.role]);

  const handleAddToCart = async (produtoId) => {
    try {
      await api.post("/carrinho", {
        userId: user.id, // Certifique-se de que o ID do usuário está correto
        produtoId, // ID do produto
        quantidade: 1, // Quantidade a ser adicionada
      });
      alert("Produto adicionado ao carrinho com sucesso!"); // Notifica o sucesso
      navigate("/carrinho");
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message); // Exibe a mensagem de erro da API
      } else {
        setError("Erro desconhecido. Por favor, tente novamente.");
      }
    }
  };

  const handleEditarProduto = (produtoId) => {
    navigate(`/editar-produto/${produtoId}`); // Redireciona para a página de edição
  };

  if (loading) {
    return <div>Carregando produtos...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <Cabecalho />
      <div className="productcontainer">
        <div className="productgrid">
          {produtos.map((produto) => (
            <Produtoicone
            key={produto.id}
            idProduto={produto.id} // Passando o id do produto para o componente Produtoicone
            detalhe={() => navigate(`/produtos/${produto.id}`)}
            imagem={produto.imagens[0]}
            carinho={(e) => {
              e.stopPropagation();
              handleAddToCart(produto.id);
            }}
            nomeproduto={produto.nome}
            preco={produto.preco}
          />
          ))}
        </div>
        
      </div>
      <Rodape />
    </div>
    
  );
}
