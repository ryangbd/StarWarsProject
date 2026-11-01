import { useState } from 'react'

export default function useTransicao() {
  const [animando, setAnimando] = useState(false)

  const transicionar = (acao, duracao) => {
    setAnimando(true)
    setTimeout(() => {
      acao()
      setAnimando(false)
    }, duracao)
  }

  return { animando, transicionar }
}
