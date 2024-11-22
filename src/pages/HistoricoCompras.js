import React, { useState, useEffect, useContext } from "react";
import Cabecalho from "../components/Cabeçalho";
import "../styles/historico.css";
import Pedido from "../components/Pedido"; // Caso você tenha um componente específico para exibir o pedido
import { AuthContext } from "../contexts/AuthContext"; // Importação do AuthContext
import api from "../services/api"; // Supondo que você tenha a instância da API configurada

export default function HistoricoCompras() {
  const [pedidos, setPedidos] = useState([]); // Estado para armazenar os pedidos
  const [error, setError] = useState(""); // Para capturar erros
  const { user, loading } = useContext(AuthContext); // Pega o usuário logado

  useEffect(() => {
    // Verifica se o usuário está carregado
    if (!user || loading) {
      return;
    }

    const fetchPedidos = async () => {
      try {
        const responsePedidos = await api.get("/pedidos"); // Supondo que você tenha a rota "/pedidos" configurada
        setPedidos(responsePedidos.data); // Armazena os pedidos na variável de estado
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message); // Exibe a mensagem de erro da API
        } else {
          setError("Erro desconhecido. Por favor, tente novamente."); // Exibe uma mensagem genérica
        }
      }
    };

    fetchPedidos(); // Chama a função para buscar os pedidos
  }, [user, loading]);

  // Exibe uma mensagem de carregamento se estiver aguardando
  if (loading) {
    return <p>Carregando pedidos...</p>;
  }

  return (
    <div>
      <Cabecalho />
      <main>
        <div className="hist">
          <h1>Histórico de compras</h1>
          {error && <p className="error">{error}</p>} {/* Exibe o erro caso haja algum */}
          <div className="histgrid">
            {pedidos.length > 0 ? (
              pedidos.map((pedido) => (
                <div key={pedido.id}>
                  <div className="pedido">
                    <div className="pd1">
                      <h3>
                        Pedido: #{pedido.id} - {new Date(pedido.data).toLocaleString()} <br />
                        Usuario: {user?.nome} (ID: {user?.id}) {/* Exibe o nome e ID do usuário */}
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
                    <hr className="l1" />
                    <div className="pd2">
                      <h3>Endereço de Entrega:</h3>
                      <p>{pedido.enderecoEntrega}</p>
                    </div>
                    <hr className="l1" />
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
