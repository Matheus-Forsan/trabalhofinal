import React, { useState } from "react";
import "../styles/registro.css";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Registro() {
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
    role: "USER"
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/registro", formData);
      alert("Cadastro realizado com sucesso!");
      // Navegar para a página de login ou alguma outra página após o cadastro
      navigate("/x'");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Erro desconhecido. Por favor, tente novamente.");
      }
    }
  };

  return (
    <div className="regback">
      <div className="regcont">
        <h1>Cadastre-se</h1>
        <hr />
        <div className="reggrid">
          {/* Nome Completo */}
          <div className="tipo1">
            <p>Nome completo</p>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Digite seu nome completo"
            />
          </div>

          {/* CPF e Telefone */}
          <div className="cont2">
            <div>
              <p>CPF</p>
              <input
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                placeholder="Digite seu CPF"
              />
            </div>
            <div>
              <p>Telefone</p>
              <input
                type="text"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                placeholder="Digite seu telefone"
              />
            </div>
          </div>

          {/* Email */}
          <div className="tipo1">
            <p>Email</p>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Digite seu email"
            />
          </div>

          {/* Cidade e Bairro */}
          <div className="cont2">
            <div>
              <p>Cidade</p>
              <input
                type="text"
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                placeholder="Digite sua cidade"
              />
            </div>
            <div>
              <p>Bairro</p>
              <input
                type="text"
                name="bairro"
                value={formData.bairro}
                onChange={handleChange}
                placeholder="Digite seu bairro"
              />
            </div>
          </div>

          {/* Logradouro e Complemento */}
          <div className="cont2">
            <div>
              <p>Logradouro</p>
              <input
                type="text"
                name="logradouro"
                value={formData.logradouro}
                onChange={handleChange}
                placeholder="Digite seu logradouro"
              />
            </div>
            <div>
              <p>Complemento</p>
              <input
                type="text"
                name="complemento"
                value={formData.complemento}
                onChange={handleChange}
                placeholder="Digite seu complemento"
              />
            </div>
          </div>

          {/* Número da residência */}
          <div className="tipo2">
            <p>Numero</p>
            <input
              type="text"
              name="numero"
              value={formData.numero}
              onChange={handleChange}
              placeholder="Número da residência"
            />
          </div>

          {/* Senha */}
          <div className="tipo1">
            <p>Crie uma senha</p>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Crie uma senha"
            />
          </div>


          {/* Exibição de erros */}
          {error && <p className="error-message">{error}</p>}

          {/* Botão de cadastro */}
          <button className="botaologin" onClick={handleSubmit}>
            <h1>Cadastrar</h1>
          </button>
        </div>
      </div>
    </div>
  );
}
