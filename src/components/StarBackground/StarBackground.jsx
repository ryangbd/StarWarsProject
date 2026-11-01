import { useEffect, useRef } from 'react'
import {
  createStars,
  createDust,
  createShootingStar,
  drawNebula,
  drawStars,
  drawShootingStars,
  drawDust,
} from './starfield'

export default function StarBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const stars = createStars(canvas)
    const shootingStars = []
    // dispara estrelas cadentes em intervalos aleatórios
    let shootTimer = 0
    const dust = createDust(canvas)

    let t = 0

    // leve paralax com o mouse
    let mx = 0, my = 0
    const onMove = (e) => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2
      my = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)

    function loop() {
      t++

      // fundo base
      ctx.fillStyle = '#02020a'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      drawNebula(ctx)

      // leve deslocamento de paralax nas estrelas maiores
      ctx.save()
      ctx.translate(mx * 4, my * 4)
      drawStars(ctx, stars, t)
      ctx.restore()

      drawDust(ctx, dust)

      // estrelas cadentes
      shootTimer++
      if (shootTimer > 180 + Math.random() * 240) {
        shootingStars.push(createShootingStar(canvas))
        shootTimer = 0
      }
      drawShootingStars(ctx, shootingStars)

      animId = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        display: 'block',
      }}
    />
  )
}
