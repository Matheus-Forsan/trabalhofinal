import React, { useState, useEffect, useContext } from "react";
import "../styles/Usuarios.css";
import { AuthContext } from "../contexts/AuthContext";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Cabecalho from "../components/Cabeçalho";


export default function Usuarios() {
  const { user } = useContext(AuthContext);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await api.get("/users");
        setUsuarios(response.data || []);
        setLoading(false);
      } catch (error) {
        setError("Erro ao carregar usuários. Tente novamente.");
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, [user.token]);

  const handleDelete = async (userId) => {
    console.log('user'.userId);
    
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir este usuário?"
    );
    if (confirmed) {
      try {
        await api.delete(`/users/${userId}`);
        // Após excluir, removemos o usuário da lista localmente
        setUsuarios((prevUsuarios) =>
          prevUsuarios.filter((usuario) => usuario.id !== userId)
        );
        alert("Usuário excluído com sucesso!");
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
      }
    }
  };


  if (loading) {
    return <p>Carregando usuários...</p>;
  }

  return (
    <div>
      <Cabecalho />
      <div className="usercontainer">
        
        <h1>Gestão de Usuários</h1>
        <p>Visualização e edição de usuários</p>
        <div className="usersgrid">
          {usuarios.length > 0 ? (
            usuarios.map((usuario) => (
              <div key={usuario.id} className="borderlegal">
                <div className="manuser">
                  <div className="usuarioInfo">
                    <p>
                      <strong>ID:</strong> {usuario.id}
                    </p>
                    <p>
                      <strong>{usuario.id}:</strong> {usuario.nome || "N/A"}
                    </p>
                    <p>
                      <strong>Email:</strong> {usuario.email || "N/A"}
                    </p>
                    <p>
                      <strong>CPF:</strong> {usuario.cpf || "N/A"}
                    </p>
                  </div>

                  <div className="actions">
                    <button
                      className="editButton"
                      onClick={() => navigate(`/admin/usuarios/${usuario.id}`)}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(usuario.id)}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Nenhum usuário encontrado.</p>
          )}
        </div>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}
