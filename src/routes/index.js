import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Registro from "../pages/Registro";
import Home from "../pages/Home";
import DetalhesProduto from "../pages/DetalhesProduto";
import Produtos from "../pages/Produtos";
import Carrinho from "../pages/Carrinho";
import Perfil from "../pages/Perfil";
import Vendas from "../pages/Vendas";
import Usuarios from "../pages/Usuarios";
import EditarProduto from "../pages/Editarproduto";
import HistoricoCompras from "../pages/HistoricoCompras";
import PrivateRoutes from "./PrivateRoutes";  // Certifique-se de que você tem esse arquivo
import AdminRoutes from "./AdminRoutes";     // Importando AdminRoutes
import Cadastro from "../pages/Cadastro"  // Importando Cadastro
import EditUser2 from "../pages/Edituser2";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/produtos/:id" element={<DetalhesProduto />} />

        {/* Rotas protegidas (apenas usuários logados) */}
        <Route element={<PrivateRoutes />}>
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/historicodecompras" element={<HistoricoCompras />}/>
        </Route>

        {/* Rotas protegidas de admin (apenas administradores) */}
        <Route element={<AdminRoutes />}>
          <Route path="/admin/cadastro" element={<Cadastro />} />
          <Route path="/admin/vendas" element={<Vendas />} />
          <Route path="/admin/usuarios/:id" element={<EditUser2 />} />
          <Route path="/admin/usuarios" element={<Usuarios />} />
          <Route path="/admin/produtos/:id" element={<EditarProduto />} />
        </Route>
      </Routes>
    </Router>
  );
}
