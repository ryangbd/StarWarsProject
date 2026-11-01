import './PainelInfo.css'

function PainelInfo({ animando }) {
  return (
    <div className={`openInfo ${animando ? 'fade-outpersona' : 'fade-inpersona'}`}>
      <span>ha</span>
    </div>
  )
}

export default PainelInfo
