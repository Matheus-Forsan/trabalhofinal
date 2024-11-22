import React, { useState, useEffect, useContext } from "react";
import Cabecalho from "../components/Cabeçalho";
import "../styles/historico.css";
import Pedido from "../components/Pedido"; // Caso você tenha um componente específico para exibir o pedido
import { AuthContext } from "../contexts/AuthContext"; // Importação do AuthContext
import api from "../services/api"; // Supondo que você tenha a instância da API configurada
import { useNavigate } from "react-router-dom"; // Usar navigate para redirecionamento

export default function Vendas() {
  const { user } = useContext(AuthContext); // Pega o usuário logado para obter o token
  const [vendas, setVendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Usar navigate para redirecionamento

  useEffect(() => {
    const fetchVendas = async () => {
      try {
        const response = await api.get("/vendas");
        setVendas(response.data); // Armazena os dados das vendas
        setLoading(false);
      } catch (error) {
        // Verifica se a API retornou um erro com uma mensagem específica
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setError(error.response.data.message); // Exibe a mensagem de erro da API
        } else {
          setError("Erro desconhecido. Por favor, tente novamente.");
        }
        setLoading(false); // Para de carregar caso ocorra um erro
      }
    };

    fetchVendas();
  }, [user.token]); // Recarregar as vendas quando o token do usuário mudar

  if (loading) {
    return <p>Carregando vendas...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Cabecalho />
      <main>
        <div className="hist">
          <h1>Histórico de compras</h1>
          {error && <p className="error">{error}</p>} {/* Exibe o erro caso haja algum */}
          <div className="histgrid">
            {vendas.length > 0 ? (
              vendas.map((pedido) => (
                <div key={pedido.id}>
                  <div className="pedido">
                    <div className="pd1">
                      <h3>
                        Pedido: #{pedido.id} - {new Date(pedido.data).toLocaleString()} <br />
                        {/* Usuário que fez a compra */}
                        Usuario: {pedido.user.nome} (ID: {pedido.user.id}) 
                      </h3>
                    </div>
                    <hr className="l1" />
                    <div className="pd2">
                      <h3>Produtos:</h3>
                      <ul>
                        {pedido.itens.map((item) => (
                          <li key={item.id}>
                            Produto: {item.produto.nome} <br />
                            Quantidade: {item.quantidade} <br />
                            Preço Unitário: R$ {item.produto.preco.toFixed(2)}
                          </li>
                        ))}
                      </ul>
                    </div>
                   
                    <div className="pd2">
                      <h3>Forma de pagamento:</h3>
                      <p>{pedido.metodoPagamento}</p>
                    </div>
                    <hr className="l1" />
                    <div className="pd2">
                      <h3>Valor Total:</h3>
                      <p>R$ {pedido.total.toFixed(2)}</p> {/* Formata o valor para exibição */}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Você ainda não fez compras.</p> // Mensagem caso não haja pedidos
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
