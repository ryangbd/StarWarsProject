import './Header.css'

function Header({ animando, onPersonagens }) {
  return (
    <div className={`header ${animando ? '' : 'fade-in'}`}>
      <button className="btn" onClick={onPersonagens}>Personagens</button>
      <button className="btn">Naves</button>
      <button className="btn">Planetas</button>
    </div>
  )
}

export default Header
