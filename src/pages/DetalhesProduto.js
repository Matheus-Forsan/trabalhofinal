import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cabecalho from "../components/Cabeçalho";
import "../styles/detalhes.css";
import { AuthContext } from "../contexts/AuthContext";
import api from "../services/api"; // Certifique-se de configurar a API corretamente

export default function DetalhesProduto() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const response = await api.get(`/produtos/${id}`);
        setProduto(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response?.data?.message) {
          setError(error.response.data.message);
        } else {
          setError("Erro ao carregar produto. Tente novamente.");
        }
        setLoading(false);
      }
    };

    fetchProduto();
  }, [id]);

  const handleAddToCartOrEdit = () => {
    if (user?.role === "ADMIN") {
      // Redireciona para a página de edição se o usuário for administrador
      navigate(`/admin/produtos/${id}`);
    } else {
      // Lógica para adicionar ao carrinho para usuários normais
      if (!user) {
        alert("Você precisa estar logado para adicionar ao carrinho.");
        return navigate("/login");
      }

      api
        .post("/carrinho", {
          userId: user.id,
          produtoId: produto.id,
          quantidade: 1, // Aqui você pode usar uma variável caso o usuário escolha a quantidade
        })
        .then(() => {
          alert("Produto adicionado ao carrinho com sucesso!");
          navigate("/carrinho");
        })
        .catch((error) => {
          setError(
            error.response?.data?.message || "Erro ao adicionar ao carrinho. Tente novamente."
          );
        });
    }
  };

  if (loading) {
    return <div>Carregando produto...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!produto) {
    return <div>Produto não encontrado</div>;
  }

  return (
    <div>
      <Cabecalho />
      <div className="produtogrid">
        {/* Renderiza a imagem do produto dinamicamente */}
        <div className="imagemproduto">
          <img src={produto.imagens[0]} alt={produto.nome} className="imagemproduto" />
        </div>

        <div className="produtoinfo">
          <h1>{produto.nome}</h1>
          <hr />
          <div className="av">
            <h3>Avaliações:</h3>
            <p>{produto.avaliacao ? produto.avaliacao.toFixed(1) : "Sem avaliações"}</p>
          </div>
          <div className="price">
            <h2>R${produto.preco.toFixed(2)}</h2>
          </div>
          <div className="est">
            <h3>Em estoque: {produto.estoque}</h3>
          </div>
          <div className="size">
            <h2>Quantidade:</h2>
            <select>
              {Array.from({ length: produto.estoque }, (_, i) => i + 1).map((qtd) => (
                <option key={qtd}>{qtd}</option>
              ))}
            </select>
          </div>
          <div className="bd">
            {/* Botão que alterna entre editar e adicionar ao carrinho */}
            <button className="addtocart" onClick={handleAddToCartOrEdit}>
              <h2>{user?.role === "ADMIN" ? "Editar Produto" : "Adicionar ao carrinho"}</h2>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
