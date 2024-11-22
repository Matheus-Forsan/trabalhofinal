import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { Link } from "react-router-dom";

export default function Login() {
  // Definindo estados para email, senha e erro
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  // Desestruturando o contexto para pegar a função de login
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Função que gerencia o envio do formulário
  const handleLogin = async (event) => {
    event.preventDefault();  // Previne o comportamento padrão do formulário

    try {
      // Chama a função de login com as credenciais
      await login(email, password);
      navigate("/");  // Redireciona para a página inicial após login bem-sucedido
    } catch (error) {
      // Verifica se a API retornou uma mensagem de erro
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);  // Exibe a mensagem de erro
      } else {
        setError("Erro desconhecido. Por favor, tente novamente."); // Mensagem genérica
      }
    }
  };

  return (
    <body className="loginbody">
      <div className="logback">
        <div className="logincont">
          <h1>Faça seu login</h1>
          <hr />
          <div className="loggrid">
            {/* Campo de email */}
            <div>
              <p>Seu email*</p>
              <input
                type="email"
                value={email}  // Vincula o valor do input ao estado
                onChange={(e) => setEmail(e.target.value)}  // Atualiza o estado quando o usuário digita
                placeholder="Digite seu email"
              />
            </div>

            {/* Campo de senha */}
            <div>
              <p>Sua senha*</p>
              <input
                type="password"  // Alterado para "password" para ocultar a senha
                value={password}  // Vincula o valor do input ao estado
                onChange={(e) => setPassword(e.target.value)}  // Atualiza o estado quando o usuário digita
                placeholder="Digite sua senha"
              />
            </div>

            {/* Exibição de erro */}
            {error && <p className="error-message">{error}</p>}

            {/* Botão de login */}
            <button className="botaologin" onClick={handleLogin}>
              <h1>Entrar</h1>
            </button>

            {/* Link para cadastro */}
            <p className="naopossui">
              Não possui um login? <Link to="/registro">Clique aqui</Link> para realizar seu cadastro.
            </p>
          </div>
        </div>
      </div>
    </body>
  );
}
