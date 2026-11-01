const STAR_COUNT = 320
const DUST_COUNT = 60

function pickStarColor() {
  const roll = Math.random()
  if (roll < 0.6)  return '#ffffff'
  if (roll < 0.75) return '#ffe8b0'  // amarelada
  if (roll < 0.88) return '#b0d0ff'  // azulada
  return '#ffb0b0'                   // avermelhada
}

export function createStars(canvas) {
  return Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.4 + 0.2,
    alpha: Math.random() * 0.6 + 0.3,
    twinkleSpeed: Math.random() * 0.015 + 0.005,
    twinkleOffset: Math.random() * Math.PI * 2,
    color: pickStarColor(),
  }))
}

export function createDust(canvas) {
  return Array.from({ length: DUST_COUNT }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 0.8 + 0.2,
    alpha: Math.random() * 0.15 + 0.02,
    vx: (Math.random() - 0.5) * 0.08,
    vy: (Math.random() - 0.5) * 0.08,
  }))
}

export function createShootingStar(canvas) {
  const angle = (Math.random() * 30 + 15) * (Math.PI / 180)
  return {
    x: Math.random() * canvas.width * 0.8,
    y: Math.random() * canvas.height * 0.4,
    len: Math.random() * 120 + 60,
    speed: Math.random() * 8 + 6,
    angle,
    alpha: 1,
    width: Math.random() * 1.5 + 0.5,
  }
}

export function drawNebula(ctx) {
  const { canvas } = ctx

  // nebulosa principal (roxo/azul)
  const g1 = ctx.createRadialGradient(
    canvas.width * 0.65, canvas.height * 0.3, 0,
    canvas.width * 0.65, canvas.height * 0.3, canvas.width * 0.45
  )
  g1.addColorStop(0,   'rgba(40,10,90,0.22)')
  g1.addColorStop(0.5, 'rgba(15,5,50,0.12)')
  g1.addColorStop(1,   'rgba(0,0,0,0)')
  ctx.fillStyle = g1
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // nebulosa secundária (azul gelado)
  const g2 = ctx.createRadialGradient(
    canvas.width * 0.2, canvas.height * 0.7, 0,
    canvas.width * 0.2, canvas.height * 0.7, canvas.width * 0.35
  )
  g2.addColorStop(0,   'rgba(0,20,60,0.18)')
  g2.addColorStop(0.6, 'rgba(0,8,30,0.08)')
  g2.addColorStop(1,   'rgba(0,0,0,0)')
  ctx.fillStyle = g2
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // nebulosa terciária (âmbar/dourado — referência Star Wars)
  const g3 = ctx.createRadialGradient(
    canvas.width * 0.85, canvas.height * 0.8, 0,
    canvas.width * 0.85, canvas.height * 0.8, canvas.width * 0.28
  )
  g3.addColorStop(0,   'rgba(80,40,0,0.12)')
  g3.addColorStop(0.5, 'rgba(40,20,0,0.05)')
  g3.addColorStop(1,   'rgba(0,0,0,0)')
  ctx.fillStyle = g3
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

export function drawStars(ctx, stars, time) {
  stars.forEach(s => {
    const twinkle = Math.sin(time * s.twinkleSpeed + s.twinkleOffset)
    const alpha = s.alpha + twinkle * 0.25

    // brilho suave ao redor da estrela
    if (s.r > 1.0) {
      const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 4)
      glow.addColorStop(0, s.color.replace(')', `,${alpha * 0.3})`).replace('rgb', 'rgba'))
      glow.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.globalAlpha = Math.max(0, Math.min(1, alpha))
    ctx.fillStyle = s.color
    ctx.beginPath()
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
    ctx.fill()
  })
  ctx.globalAlpha = 1
}

export function drawShootingStars(ctx, shootingStars) {
  for (let i = shootingStars.length - 1; i >= 0; i--) {
    const s = shootingStars[i]
    const dx = Math.cos(s.angle) * s.len
    const dy = Math.sin(s.angle) * s.len

    const grad = ctx.createLinearGradient(s.x, s.y, s.x - dx, s.y - dy)
    grad.addColorStop(0, `rgba(255,245,200,${s.alpha})`)
    grad.addColorStop(0.3, `rgba(200,220,255,${s.alpha * 0.5})`)
    grad.addColorStop(1, 'rgba(0,0,0,0)')

    ctx.strokeStyle = grad
    ctx.lineWidth = s.width
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(s.x, s.y)
    ctx.lineTo(s.x - dx, s.y - dy)
    ctx.stroke()

    s.x += Math.cos(s.angle) * s.speed
    s.y += Math.sin(s.angle) * s.speed
    s.alpha -= 0.018

    if (s.alpha <= 0) shootingStars.splice(i, 1)
  }
}

export function drawDust(ctx, dust) {
  const { canvas } = ctx

  dust.forEach(d => {
    d.x += d.vx
    d.y += d.vy
    if (d.x < 0) d.x = canvas.width
    if (d.x > canvas.width) d.x = 0
    if (d.y < 0) d.y = canvas.height
    if (d.y > canvas.height) d.y = 0

    ctx.globalAlpha = d.alpha
    ctx.fillStyle = '#aaccff'
    ctx.beginPath()
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
    ctx.fill()
  })
  ctx.globalAlpha = 1
}
