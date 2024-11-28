import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../contexts/AuthContext";

export default function EditUser2() {
  const { id } = useParams(); // Obtém o ID do usuário pela URL
  const { user } = useContext(AuthContext); // Usuário logado
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Carregar informações do usuário a partir do ID
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await api.get(`/users/${id}`);
        const usuarioData = response.data;

        setNome(usuarioData.nome || "");
        setEmail(usuarioData.email || "");
        setTelefone(usuarioData.telefone || "");
        setCpf(usuarioData.cpf || "");
        setRole(usuarioData.role || "USER");
        setLoading(false);
      } catch (err) {
        setError("Erro ao carregar os dados do usuário.");
        setLoading(false);
      }
    };

    fetchUsuario();
  }, [id]);

  // Atualizar usuário
  const handleEditUsuario = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const updatedUserData = {
      nome,
      email,
      telefone,
      cpf,
      role,
      ...(password && { password }), // Inclui a senha apenas se foi preenchida
    };

    try {
      await api.put(`/users/${id}`, updatedUserData);
      setSuccessMessage("Usuário atualizado com sucesso!");
      navigate("/admin/usuarios");
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao atualizar o usuário. Tente novamente.");
    }
  };

  // Excluir usuário
  const handleDeleteUsuario = async () => {
    const confirmed = window.confirm("Tem certeza que deseja excluir este usuário?");
    if (confirmed) {
      try {
        await api.delete(`/users/${id}`);
        navigate("/admin/usuarios");
      } catch (err) {
        setError(err.response?.data?.message || "Erro ao excluir usuário. Tente novamente.");
      }
    }
  };

  if (loading) {
    return <div>Carregando informações do usuário...</div>;
  }

  return (
    <div className="cadastrocontainer">
      <form onSubmit={handleEditUsuario}>
        <div className="cadastro">
          <h1>Edição de Usuário</h1>
          <div className="editgrid">
            <label>
              Nome:
              <input
                name="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </label>
            <label>
              Email:
              <input
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              Contato:
              <input
                name="telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </label>
            <label>
              CPF:
              <input
                name="cpf"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />
            </label>
            <label>
              Senha:
              <input
                name="password"
                type="password"
                placeholder="Deixe vazio para manter a senha atual"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label>
              Papel:
              <select
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="USER">Usuário</option>
                <option value="ADMIN">Administrador</option>
              </select>
            </label>
          </div>
          {successMessage && <div className="success">{successMessage}</div>}
          {error && <div className="error">{error}</div>}
          <button type="submit">Atualizar Usuário</button>
          <button type="button" onClick={handleDeleteUsuario}>
            Excluir Usuário
          </button>
        </div>
      </form>
    </div>
  );
}
