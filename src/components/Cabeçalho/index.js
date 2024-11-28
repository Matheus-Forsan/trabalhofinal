import React, { useContext } from "react";
import { LiaCartPlusSolid } from "react-icons/lia";
import { FaUser } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./styles.css";
import { AuthContext } from "../../contexts/AuthContext";
import { AiFillProduct } from "react-icons/ai";

export default function Cabecalho({}) {
  const { user } = useContext(AuthContext);

  console.log("Usuário atual:", user);
  console.log("Role atual:", user?.role);

  return (
    <div>
      <header className="headerbar">
        <div className="content">
          {user?.role === "ADMIN" ? (
            <Link to="/admin/cadastro" className="tocarrinho">
              <p>Adicionar Produto</p>
              <FaPlus className="carticon2" />
            </Link>
          ) : (
            <Link to="/carrinho" className="tocarrinho">
              <p>Carrinho</p>
              <LiaCartPlusSolid className="carticon" />
            </Link>
          )}
          <Link to="/produtos" className="tocarrinho">
            <p>Produtos</p>
            <AiFillProduct className="carticon3" />
          </Link>
        </div>
        <div className="search"></div>
        <div className="losfavoritos">
          <Link className="legal" to="/">
            <h1>FIT WEAR</h1>
          </Link>
        </div>
        {user ? (
          <Link to="/perfil">
            <FaUser className="usericon" />
          </Link>
        ) : (
          <Link to="/login" className="tocarrinho">
            <p>Login</p>
          </Link>
        )}
      </header>
    </div>
  );
}
