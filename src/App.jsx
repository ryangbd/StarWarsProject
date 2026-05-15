import StarBackground from './StarBackground'
import './App.css'

function App() {
  return (
    <>
      <StarBackground />
      <div className="titlelogo">
        <h1>STAR WARS</h1>
        <button onClick="iniciar">Iniciar</button>
      </div>
      {/* <div className="header">
        <button>Personagens</button>
        <button>Naves</button>
        <button>Planetas</button>
      </div> */}
    </>
    
  )
}

export default App