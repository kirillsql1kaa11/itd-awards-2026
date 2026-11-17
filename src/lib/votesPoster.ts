import { categories } from '../data/categories'
import { EVENT } from '../data/event'

const WIDTH = 1080
const HEIGHT = 1440
const MARGIN = 64

const gold = '#cdb57c'
const goldBright = '#ecd9a7'
const cream = '#efe7d6'
const ink = '#080806'

type PosterVotes = Record<string, { picks: string[] }>

function fitText(context: CanvasRenderingContext2D, text: string, maxWidth: number): string {
  if (context.measureText(text).width <= maxWidth) return text
  let result = text
  while (result.length > 1 && context.measureText(`${result}…`).width > maxWidth) {
    result = result.slice(0, -1)
  }
  return `${result.trimEnd()}…`
}

function drawRule(context: CanvasRenderingContext2D, y: number) {
  const gradient = context.createLinearGradient(MARGIN, y, WIDTH - MARGIN, y)
  gradient.addColorStop(0, 'rgba(205, 181, 124, 0.04)')
  gradient.addColorStop(0.5, 'rgba(205, 181, 124, 0.42)')
  gradient.addColorStop(1, 'rgba(205, 181, 124, 0.04)')
  context.fillStyle = gradient
  context.fillRect(MARGIN, y, WIDTH - MARGIN * 2, 1)
}

export async function createVotesPoster(votes: PosterVotes): Promise<Blob> {
  await document.fonts.ready
  await Promise.all([
    document.fonts.load('400 16px "Manrope"'),
    document.fonts.load('500 16px "Manrope"'),
    document.fonts.load('600 16px "Manrope"'),
    document.fonts.load('700 16px "Manrope"'),
    document.fonts.load('800 16px "Manrope"'),
    document.fonts.load('600 72px "Cormorant Garamond"'),
    document.fonts.load('500 italic 72px "Cormorant Garamond"'),
    document.fonts.load('400 118px "Pirata One"'),
  ]).catch(() => [])

  const canvas = document.createElement('canvas')
  canvas.width = WIDTH
  canvas.height = HEIGHT
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Canvas is not available')

  context.fillStyle = ink
  context.fillRect(0, 0, WIDTH, HEIGHT)

  const glow = context.createRadialGradient(WIDTH * 0.5, 80, 20, WIDTH * 0.5, 80, 820)
  glow.addColorStop(0, 'rgba(236, 217, 167, 0.2)')
  glow.addColorStop(0.45, 'rgba(205, 181, 124, 0.07)')
  glow.addColorStop(1, 'rgba(8, 8, 6, 0)')
  context.fillStyle = glow
  context.fillRect(0, 0, WIDTH, 760)

  const vignette = context.createLinearGradient(0, HEIGHT - 420, 0, HEIGHT)
  vignette.addColorStop(0, 'rgba(8, 8, 6, 0)')
  vignette.addColorStop(1, 'rgba(205, 181, 124, 0.08)')
  context.fillStyle = vignette
  context.fillRect(0, HEIGHT - 420, WIDTH, 420)

  context.strokeStyle = 'rgba(205, 181, 124, 0.34)'
  context.lineWidth = 1.5
  context.strokeRect(30, 30, WIDTH - 60, HEIGHT - 60)

  context.textBaseline = 'alphabetic'
  context.font = '700 13px "Manrope"'
  context.fillStyle = gold
  context.fillText('ITD COMMUNITY AWARDS', MARGIN, 86)

  context.textAlign = 'right'
  context.fillStyle = 'rgba(239, 231, 214, 0.46)'
  context.fillText('ПЕРВЫЙ СЕЗОН · 2026', WIDTH - MARGIN, 86)
  context.textAlign = 'left'

  context.fillStyle = cream
  context.font = '600 76px "Cormorant Garamond"'
  context.fillText('Мой', MARGIN, 190)
  const myWidth = context.measureText('Мой ').width
  context.fillStyle = goldBright
  context.font = '500 italic 76px "Cormorant Garamond"'
  context.fillText('голос', MARGIN + myWidth, 190)

  context.textAlign = 'right'
  context.fillStyle = gold
  context.font = '400 108px "Pirata One"'
  context.fillText('2026', WIDTH - MARGIN, 190)
  context.textAlign = 'left'

  context.font = '500 12px "Manrope"'
  context.fillStyle = 'rgba(239, 231, 214, 0.48)'
  context.fillText(
    `${categories.length} номинаций · один голос в каждой · голосование до ${EVENT.votingEndLabel}`,
    MARGIN,
    226,
  )

  drawRule(context, 252)

  const columns = 2
  const columnGap = 38
  const cellWidth = (WIDTH - MARGIN * 2 - columnGap) / columns
  const rowHeight = 106
  const gridTop = 286

  categories.forEach((category, index) => {
    const column = index % columns
    const row = Math.floor(index / columns)
    const x = MARGIN + column * (cellWidth + columnGap)
    const y = gridTop + row * rowHeight

    if (row > 0) {
      context.fillStyle = 'rgba(205, 181, 124, 0.11)'
      context.fillRect(x, y - 20, cellWidth, 1)
    }

    context.beginPath()
    context.arc(x + 4, y - 4, 2.4, 0, Math.PI * 2)
    context.fillStyle = gold
    context.fill()

    context.font = '700 13px "Manrope"'
    context.fillStyle = 'rgba(236, 217, 167, 0.82)'
    const categoryTitle = fitText(
      context,
      category.title.toLocaleUpperCase('ru'),
      cellWidth - 22,
    )
    context.fillText(categoryTitle, x + 16, y)

    const nominee = category.nominees.find((item) =>
      votes[category.id]?.picks.includes(item.id),
    )

    if (nominee) {
      context.font = '600 24px "Cormorant Garamond"'
      context.fillStyle = cream
      context.fillText(fitText(context, nominee.name, cellWidth - 16), x, y + 34)

      context.font = '500 12px "Manrope"'
      context.fillStyle = 'rgba(239, 231, 214, 0.46)'
      context.fillText(nominee.handle, x, y + 54)
    } else {
      context.font = '500 18px "Manrope"'
      context.fillStyle = 'rgba(239, 231, 214, 0.24)'
      context.fillText('—', x, y + 35)
    }
  })

  drawRule(context, 1272)

  context.font = '600 11px "Manrope"'
  context.fillStyle = gold
  context.fillText('ИТД ИТП', MARGIN, 1310)
  context.fillStyle = 'rgba(239, 231, 214, 0.42)'
  context.fillText(`ИТОГИ ${EVENT.winnersLabel.toLocaleUpperCase('ru')}`, MARGIN, 1332)

  context.textAlign = 'right'
  context.font = '500 12px "Manrope"'
  context.fillStyle = 'rgba(239, 231, 214, 0.52)'
  context.fillText('t.me/itditp', WIDTH - MARGIN, 1310)
  context.fillStyle = 'rgba(239, 231, 214, 0.34)'
  context.fillText('@sneyr', WIDTH - MARGIN, 1332)
  context.textAlign = 'left'

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob)
      else reject(new Error('Could not create the poster'))
    }, 'image/png')
  })
}
