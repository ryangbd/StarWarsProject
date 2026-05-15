function Personagem({nome,lado}){
    return(
        <div className="personagem">
            <h1>{nome}</h1>
            <p>Lado: {lado}</p>
        </div>
    )
}

export default Personagem