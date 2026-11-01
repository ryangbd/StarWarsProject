import './PersonagemItem.css'

function PersonagemItem({ nome, img, onSelecionar }) {
  return (
    <div className="ItemList" onClick={onSelecionar}>
      <img src={img} alt="" />
      <span>{nome}</span>
    </div>
  )
}

export default PersonagemItem
