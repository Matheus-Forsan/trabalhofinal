import React, { useState, useEffect, useContext } from "react";
import "../styles/cadastro.css";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../contexts/AuthContext"; // Certifique-se de importar o contexto

export default function EditarProduto() {
  const { id } = useParams();
  const { user } = useContext(AuthContext); // Acessando o contexto de autenticação
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagens, setImagens] = useState([]);
  const [imagePreview, setImagePreview] = useState(null); // Para pré-visualizar a imagem
  const [visibilidade, setVisibilidade] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Carregar os dados do produto
  useEffect(() => {
    if (!user || !user.token) {
      setError("Token de autenticação ausente. Por favor, faça login novamente.");
      return;
    }

    const fetchProduto = async () => {
      try {
        const response = await api.get(`/produtos/${id}`);
        const produtoData = response.data;

        setNome(produtoData.nome);
        setPreco(produtoData.preco);
        setEstoque(produtoData.estoque);
        setDescricao(produtoData.descricao);
        setVisibilidade(produtoData.visibilidade);
        setLoading(false);
        
        if (produtoData.imagens && produtoData.imagens.length > 0) {
          setImagePreview(produtoData.imagens[0]); // Aqui você deve substituir pela URL da imagem
        }

        setLoading(false);
      } catch (error) {
        if(
            error.response &&
          error.response.data &&
          error.response.data.message
        ) {
            setError(error.response.data.message);
          } else {
            setError("Erro desconhecido. Por favor, tente novamente.");
          }
          setLoading(false);
      }
    };

    fetchProduto();
  }, [id, user]);

  // Função para editar produto
  const handleEditProduto = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("preco", Number(preco));
    formData.append("estoque", Number(estoque));
    formData.append("descricao", descricao);
    formData.append("visibilidade", visibilidade ? "true" : "false");

    Array.from(imagens).forEach((imagem) => {
      formData.append("imagens", imagem);
    });

    try {
      await api.put(`/produtos`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccessMessage("Produto atualizado com sucesso!");
      navigate("/");
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

  // Função para excluir produto
  const handleDeleteProduto = async () => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este produto?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/produtos/${id}`);
      alert("Produto excluído com sucesso!");
      navigate("/");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(`Erro ao excluir o produto: ${error.response.data.message}`);
      } else {
        alert(
          "Erro desconhecido ao excluir o produto. Por favor, tente novamente."
        );
      }
    }
  };

  

  // Função para lidar com a mudança da imagem
  const handleImageChange = (e) => {
    const files = e.target.files;
    setImagens(files);

    // Exibindo a pré-visualização da primeira imagem selecionada
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  if (loading) {
    return <div>Carregando informações do produto...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="cadastrocontainer">
      <form onSubmit={handleEditProduto}>
        <div className="cadastro">
          <div className="cadastrogrid">
            <div>
              <h1>Editar Produto</h1>
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
                {/* Se imagePreview existir, exibe a imagem */}
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Pré-visualização"
                    className="imgimgcadastro"
                  />
                )}
              </div>
              <h4>Selecione uma nova imagem</h4>
              <input type="file" multiple onChange={handleImageChange} />
            </div>
          </div>
          {error && <div className="error">{error}</div>}
          {successMessage && <div className="success">{successMessage}</div>}
          <button type="submit">Atualizar Produto</button>
          <button type="button" onClick={handleDeleteProduto}>
            Excluir Produto
          </button>
        </div>
      </form>
    </div>
  );
}
