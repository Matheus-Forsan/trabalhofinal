import React, { useState } from "react";
import "../styles/cadastro.css";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Cabecalho from "../components/Cabeçalho";
import Footerdosite from "../components/Footerdosite";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");
  const [imagens, setImagens] = useState([]);
  const [imagePreview, setImagePreview] = useState(""); // Estado para armazenar a URL da imagem
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleAddProduto = async (e) => {
    e.preventDefault();

    if (
      !nome.trim() ||
      !descricao.trim() ||
      isNaN(preco) ||
      isNaN(estoque) ||
      imagens.length === 0
    ) {
      setError("Todos os campos devem ser preenchidos corretamente.");
      return;
    }

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("descricao", descricao);
    formData.append("preco", Number(preco));
    formData.append("estoque", Number(estoque));

    Array.from(imagens).forEach((imagem) => {
      formData.append("imagens", imagem);
    });

    try {
      await api.post("/produtos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccessMessage("Produto adicionado com sucesso!");
      navigate("/");
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Erro desconhecido. Por favor, tente novamente.");
      }
    }
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    setImagens(files);

    // Cria uma URL de visualização para a primeira imagem selecionada
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Armazena a URL da imagem para visualização
      };
      reader.readAsDataURL(files[0]); // Lê o arquivo como uma URL
    }
  };

  return (
    <>
      <Cabecalho />
      <div className="cadastrocontainer">
        <form onSubmit={handleAddProduto}>
          <div className="cadastro">
            <div className="cadastrogrid">
              <div>
                <h1>Cadastro de Produtos</h1>
                <div className="paia">
                  <h2>Nome do Produto</h2>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>
                <div className="paia">
                  <h2>Estoque</h2>
                  <input
                    type="number"
                    value={estoque}
                    onChange={(e) => setEstoque(e.target.value)}
                  />
                </div>
                <div className="paia">
                  <h2>Descrição</h2>
                  <input
                    type="text"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                  />
                </div>
                <div className="paia">
                  <h2>Preço</h2>
                  <input
                    type="number"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                  />
                </div>
              </div>
              <div className="paia3">
                <div className="imgcadastro">
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Pré-visualização"
                      className="imgimgcadastro"
                    />
                  )}
                </div>
                <h4>Selecione uma imagem</h4>
                <input type="file" multiple onChange={handleImageChange} />
              </div>
            </div>
            {error && <div className="error">{error}</div>}
            {successMessage && <div className="success">{successMessage}</div>}
            <button type="submit">Cadastrar produto</button>
          </div>
        </form>
      </div>
      <Footerdosite />
    </>
  );
}
