import { useState } from 'react'
import StarBackground from './components/StarBackground'
import TelaInicial from './components/TelaInicial'
import Header from './components/Header'
import TelaPersonagens from './components/TelaPersonagens'
import useTransicao from './hooks/useTransicao'

function App() {
  const [iniciado, setIniciado] = useState(false)
  const [personagensAbertos, setPersonagensAbertos] = useState(false)
  const [infoAberta, setInfoAberta] = useState(false)
  const { animando, transicionar } = useTransicao()

  const iniciar = () => transicionar(() => setIniciado(true), 500)
  const abrirPersonagens = () => transicionar(() => setPersonagensAbertos(true), 300)
  const abrirInfo = () => transicionar(() => setInfoAberta(true), 300)

  return (
    <>
      <StarBackground />
      {!iniciado && <TelaInicial animando={animando} onIniciar={iniciar} />}
      {iniciado && (
        <>
          <Header animando={animando} onPersonagens={abrirPersonagens} />
          {personagensAbertos && (
            <TelaPersonagens
              animando={animando}
              infoAberta={infoAberta}
              onSelecionar={abrirInfo}
            />
          )}
        </>
      )}
    </>
  )
}

export default App
