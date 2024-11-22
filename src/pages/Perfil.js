import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cabecalho from "../components/Cabeçalho";
import "../styles/perfil.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import api from "../services/api";
import { FaUser } from "react-icons/fa";

export default function Perfil() {
  const { logout, user } = useContext(AuthContext); // Pegando o usuário do contexto
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    password: "",
    cpf: "",
    cep: "",
    cidade: "",
    bairro: "",
    logradouro: "",
    complemento: "",
    numero: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [disabled, setDisabled] = useState(true); // Controle de edição
  const { loading } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    if (!user || loading) {
      return;
    }

    const fetchPerfil = async () => {
      try {
        const responsePerfil = await api.get("/perfil");
        setFormData({
          nome: responsePerfil.data.nome,
          email: responsePerfil.data.email,
          telefone: responsePerfil.data.telefone,
          password: "",
          cpf: responsePerfil.data.cpf,
          cep: responsePerfil.data.endereco.cep,
          cidade: responsePerfil.data.endereco.cidade,
          bairro: responsePerfil.data.endereco.bairro,
          logradouro: responsePerfil.data.endereco.logradouro,
          complemento: responsePerfil.data.endereco.complemento,
          numero: responsePerfil.data.endereco.numero,
        });
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Erro ao carregar as informações do perfil."
        );
      }
    };

    fetchPerfil();
  }, [user, loading]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      await api.patch("/perfil", formData);
      setSuccessMessage("Perfil atualizado com sucesso!");
      setDisabled(true); // Desativa edição após salvar
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Erro ao atualizar as informações do perfil."
      );
    }
  };

  const handleEdit = () => {
    setDisabled(false); // Habilita edição
  };

  if (loading) {
    return <p>Carregando perfil...</p>;
  }

  return (
    <div>
      <Cabecalho />
      <div className="perfil">
        <h1>Perfil do Usuário</h1>
      </div>
      <div className="perfilcontainer">
        <div className="perfilgrid">
          <div className="part1">
            <div className="icone">
              <FaUser color="white" size="100"/>
            </div>
            {!disabled ? (
              <button onClick={handleSave}>Salvar</button>
            ) : (
              <button onClick={handleEdit}>Editar</button>
            )}
            <button onClick={handleLogout}>Sair da conta</button>
          </div>
          <div className="perfilinfo">
            <h1>
              Nome:
              <input
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                disabled={disabled}
              />
            </h1>
            <h1>
              Email:
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={disabled}
              />
            </h1>
            <h1>
              Contato:
              <input
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                disabled={disabled}
              />
            </h1>
            <h1>
              CPF:
              <input
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                disabled={disabled}
              />
            </h1>
            <h1>
              Endereço:
              <input
                name="cep"
                value={formData.cep}
                onChange={handleChange}
                disabled={disabled}
              />
              ,
              <input
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                disabled={disabled}
              />
              ,
              <input
                name="bairro"
                value={formData.bairro}
                onChange={handleChange}
                disabled={disabled}
              />
              ,
              <input
                name="logradouro"
                value={formData.logradouro}
                onChange={handleChange}
                disabled={disabled}
              />
              ,
              <input
                name="complemento"
                value={formData.complemento}
                onChange={handleChange}
                disabled={disabled}
              />
              ,
              <input
                name="numero"
                value={formData.numero}
                onChange={handleChange}
                disabled={disabled}
              />
            </h1>
          </div>

          <div className="legal4">
          {user.role === "ADMIN" && (
            <Link className="historico" to="/admin/usuarios">
              <h1>+ Gestão de Usuários</h1>
            </Link>
          )}

          <Link className="historico" to={user.role === "ADMIN" ? "/admin/vendas" : "/historicodecompras"}>
            <h1>{user.role === "ADMIN" ? "+ Histórico de Vendas" : "+ Histórico de Compras"}</h1>
          </Link>
          </div>
        </div>  
      </div>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
}
