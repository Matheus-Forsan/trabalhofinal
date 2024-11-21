import React from "react";
import "../styles/cadastro.css";
import { Link } from "react-router-dom";


export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");
  const [imagens, setImagens] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleAddProduto = async (e) => {
    e.preventDefault();

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

  const handleImageChange = (e) => {
    setImagens(e.target.files);
  };


  return (
    <div className="cadastrocontainer">
      <div className="cadastro">
       <div className="cadastrogrid">
        <div> 
        <h1>Cadastro de Produtos</h1>
          <div className="paia">
          <h2>Nome do Produto</h2>
          <input type="text"></input>
          </div>
          <div className="paia">
            <h2>Estoque</h2>
          <input type="Number"></input>
          </div >
          <div className="paia">
          <h2>Descrição</h2>
            <input type="text"></input>
          </div >
          <div className="paia">
          <h2>Preço</h2>
          <input type="number"></input>
          </div>
        </div>
        <div>
          <div className="imgcadastro">
          </div>
          <h4>Selecione uma imagem</h4>
          <input type="file" />
        </div>
        </div>
        <button>Cadastrar produto</button>
     </div>
    </div>
  );
}