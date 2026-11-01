import './TelaInicial.css'

function TelaInicial({ animando, onIniciar }) {
  return (
    <div className={`titlelogo ${animando ? 'fade-out' : 'fade-in'}`}>
      <h1>STAR WARS</h1>
      <button onClick={onIniciar}>Iniciar</button>
    </div>
  )
}

export default TelaInicial
