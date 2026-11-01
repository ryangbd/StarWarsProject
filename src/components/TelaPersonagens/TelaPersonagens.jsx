import PersonagemItem from '../PersonagemItem'
import PainelInfo from '../PainelInfo'
import { personagens } from '../../data/personagens'
import './TelaPersonagens.css'

function TelaPersonagens({ animando, infoAberta, onSelecionar }) {
  const ladoLuz = personagens.filter((p) => p.lado === 'luz')
  const ladoSombra = personagens.filter((p) => p.lado === 'sombra')

  return (
    <div className={`PersonaScreen ${animando ? 'fade-outpersona' : 'fade-inpersona'}`}>
      <div className="LightSide">
        {ladoLuz.map((p) => (
          <PersonagemItem key={p.id} nome={p.nome} img={p.img} onSelecionar={onSelecionar} />
        ))}
      </div>

      {infoAberta && <PainelInfo animando={animando} />}

      <div className="DarkSide">
        {ladoSombra.map((p) => (
          <PersonagemItem key={p.id} nome={p.nome} img={p.img} onSelecionar={onSelecionar} />
        ))}
      </div>
    </div>
  )
}

export default TelaPersonagens
