import React, { useState, useEffect, useContext } from "react";
import Cabecalho from "../components/Cabeçalho";
import "../styles/Carrinho.css";
import { FaTrashAlt } from "react-icons/fa";
import CartItem from "../components/CartItem";
import { AuthContext } from "../contexts/AuthContext";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Carrinho() {
  const { user, loading: authLoading } = useContext(AuthContext); // Pega o usuário logado e o estado de loading
  const [carrinho, setCarrinho] = useState([]); // Estado para os itens no carrinho
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Loading para requisição do carrinho
  const [metodoPagamento, setMetodoPagamento] = useState(""); // Estado para o método de pagamento
  const navigate = useNavigate();

  useEffect(() => {
    // Se o usuário ainda não está carregado, não faça a requisição
    if (!user || authLoading) {
      return;
    }

    const fetchCarrinho = async () => {
      try {
        const response = await api.get("/carrinho", {
          params: { userId: user.id }, // Enviando o userId como parâmetro
        });

        // Certifique-se de que a resposta da API contém a chave 'produtos-carrinho'
        setCarrinho(response.data["produtos-carrinho"] || []);
        setLoading(false);
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setError(error.response.data.message); // Exibe a mensagem de erro da API
        } else {
          setError("Erro desconhecido. Por favor, tente novamente.");
        }
        setLoading(false);
      }
    };

    fetchCarrinho();
  }, [user, authLoading]);

  const handleQuantidadeChange = async (produtoId, quantidade) => {
    const novaQuantidade = Number(quantidade);

    // Verifica se a quantidade é um número válido
    if (isNaN(novaQuantidade) || novaQuantidade <= 0) {
      setError("Quantidade inválida.");
      return;
    }

    setCarrinho((prevCarrinho) =>
      prevCarrinho.map((item) =>
        item.produtoId === produtoId
          ? { ...item, quantidade: novaQuantidade }
          : item
      )
    );

    try {
      await api.put(
        `/carrinho`,
        { produtoId, quantidade: novaQuantidade },
        {
          params: { userId: user.id },
        }
      );
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message); // Exibe a mensagem de erro da API
      } else {
        setError("Erro desconhecido. Por favor, tente novamente.");
      }
    }
  };

  const handleDeletarItem = async (produtoId) => {
    try {
      await api.delete(`/carrinho/${produtoId}`);
      setCarrinho((prevCarrinho) =>
        prevCarrinho.filter((item) => item.produtoId !== produtoId)
      );
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message); // Exibe a mensagem de erro da API
      } else {
        setError("Erro desconhecido. Por favor, tente novamente.");
      }
    }
  };

  const handleCriarPedido = async () => {
    if (!metodoPagamento) {
      setError("Por favor, selecione um método de pagamento.");
      return;
    }

    try {
      await api.post("/pedidos", { metodoPagamento });
      alert("Pedido realizado com sucesso!");
      setCarrinho([]); // Limpa o carrinho após o pedido
      navigate("/"); // Redireciona para a página inicial
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message); // Exibe a mensagem de erro da API
      } else {
        setError("Erro desconhecido. Por favor, tente novamente.");
      }
    }
  };

  if (authLoading || loading) {
    return <p>Carregando carrinho...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Cálculo do total - verificação de NaN e valores válidos
  const total = carrinho.reduce((acc, item) => {
    const preco = parseFloat(item.produto.preco); // Certifique-se de que preco seja um número
    const quantidade = parseInt(item.quantidade, 10); // Certifique-se de que quantidade seja um número

    // Se ambos são números válidos, podemos adicionar ao total
    if (!isNaN(preco) && !isNaN(quantidade)) {
      return acc + (preco * quantidade);
    }
    return acc; // Se algum valor for inválido, não adiciona nada
  }, 0);

  console.log('carinho',carrinho);
  

  return (
    <div>
      <Cabecalho />
      <div className="Carrinho">
        <div className="Cargrid">
          {carrinho.map((item) => (
            <div key={item.produtoId} className="CartItem">
              <CartItem
                valorproduto={item.produto.preco}
                nomeproduto={item.produto.nome}
                fotoproduto={item.produto.imagens[0]}
                qntdproduto={item.quantidade}
                namudança={(e) => handleQuantidadeChange(item.produtoId, e.target.value)}
                apagar={() => handleDeletarItem(item.produtoId)}  // Passando a função de deletar para o CartItem
              />
              
            </div>
          ))}
        </div>
        <div className="finalizar">
          <div className="opciones">
            <div className="fin1">
              <h2>
                Selecione uma forma de pagamento:
                <select
                  value={metodoPagamento}
                  onChange={(e) => setMetodoPagamento(e.target.value)}
                >
                  <option value="">Selecione</option>
                  <option value="pix">Pix</option>
                  <option value="cartao">Cartão</option>
                  <option value="boleto">Boleto</option>
                </select>
              </h2>
            </div>
            
           
           
          </div>
          <div>
            <h1>Total: R$ {total.toFixed(2)}</h1>
          </div>
        </div>
        <input
          type="button"
          className="botaocompra"
          value="FINALIZAR COMPRA"
          onClick={handleCriarPedido}
        />
      </div>
    </div>
  );
}
