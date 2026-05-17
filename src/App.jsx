import StarBackground from './StarBackground'
import './App.css'
import {useState} from 'react'

function App() {
  const [iniciado, setIniciado] = useState(false)
  const [animando, setAnimando] = useState(false)
  const iniciar = () =>{
    setAnimando(true)
    setTimeout(() => {
      setIniciado(true)
      setAnimando(false)
    },500)
  }
  
  const [personagembtn, setPersonagem] = useState(false)
  const personagemScreen = () => {
    setAnimando(true)
    setTimeout (() => {
      setPersonagem(true)
      setAnimando(false)
    },500)
  }

  return (
    <>
      <StarBackground />
      {!iniciado && (
        <div className={`titlelogo ${animando ? 'fade-out' : 'fade-in'}`}>
          <h1>STAR WARS</h1>
          <button onClick={iniciar}>Iniciar</button>
        </div>
      )}
      {iniciado && (
        <>
          <div className={`header ${animando ? '' : 'fade-in'}`}>
            <button className="btn" onClick={personagemScreen}>Personagens</button>
            <button className="btn">Naves</button>
            <button className="btn">Planetas</button>
          </div>

          {personagembtn && (
            <div className={`PersonaScreen ${animando ? '' : 'fade-in'}`}>
              <div className="LightSide">
                <div className="ItemList">
                  <img src="src/assets/yoda-icon.jpeg" />
                  <span>Mestre Yoda</span>
                </div>
                <div className="ItemList">
                  <img src="src/assets/obiwan-icon.jpeg" />
                  <span>Obi Wan</span>
                </div>
                <div className="ItemList">
                  <img src="src/assets/anakin-icon.jpeg" />
                  <span>Anakin Skywalker</span>
                </div>
                <div className="ItemList">
                  <img src="src/assets/Ahsoka-icon.jpeg" />
                  <span>Ahsoka Tano</span>
                </div>
              </div>

              <div className="DarkSide">
                <div className="ItemList">
                  <img src="src/assets/vader-icon.jpeg" />
                  <span>Darth Vader</span>
                </div>
                <div className="ItemList">
                  <img src="src/assets/palpatine-icon.jpeg" />
                  <span>Darth Sidious</span>
                </div>
                <div className="ItemList">
                  <img src="src/assets/dooku-icon.jpeg" />
                  <span>Darth Dooku</span>
                </div>
                <div className="ItemList">
                  <img src="src/assets/maul-icon.jpeg" />
                  <span>Darth Maul</span>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default App