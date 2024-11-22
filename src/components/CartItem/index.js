import { FaTrashAlt } from "react-icons/fa";  // Certifique-se de importar o ícone

export default function CartItem({ nomeproduto, valorproduto, qntdproduto, apagar,namudança ,fotoproduto}) {
  return (
    <div className="carprod">
      <div className="carimg">
        <img className="carimgimg"src={fotoproduto} alt={nomeproduto} />  {/* Adicione a imagem do produto, se necessário */}
      </div>
      <div>
        <h3>{nomeproduto}</h3>
        <h2>R${valorproduto}</h2>
      </div>
      <input
                  type="number"
                  value={qntdproduto}
                  min="1"
                  max="5"
                  onChange={namudança}
                />
      
      {/* Ícone de lixo com a função apagar ligada */}
      <FaTrashAlt className="trashicon1" onClick={apagar} />
    </div>
  );
}
