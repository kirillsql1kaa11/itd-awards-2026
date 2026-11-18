import { categories } from '../data/categories'
import { EVENT } from '../data/event'

const WIDTH = 1080
const HEIGHT = 1350
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
    document.fonts.load('600 44px "Cormorant Garamond"'),
    document.fonts.load('500 italic 44px "Cormorant Garamond"'),
    document.fonts.load('400 92px "Pirata One"'),
  ]).catch(() => [])

  const canvas = document.createElement('canvas')
  canvas.width = WIDTH
  canvas.height = HEIGHT
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Canvas is not available')

  context.fillStyle = ink
  context.fillRect(0, 0, WIDTH, HEIGHT)

  const glow = context.createRadialGradient(WIDTH * 0.5, 30, 20, WIDTH * 0.5, 30, 780)
  glow.addColorStop(0, 'rgba(236, 217, 167, 0.2)')
  glow.addColorStop(0.45, 'rgba(205, 181, 124, 0.07)')
  glow.addColorStop(1, 'rgba(8, 8, 6, 0)')
  context.fillStyle = glow
  context.fillRect(0, 0, WIDTH, 720)

  context.strokeStyle = 'rgba(205, 181, 124, 0.34)'
  context.lineWidth = 1.5
  context.strokeRect(30, 30, WIDTH - 60, HEIGHT - 60)

  context.textBaseline = 'alphabetic'
  context.font = '400 92px "Pirata One"'
  context.fillStyle = goldBright
  context.fillText('ITD AWARDS', MARGIN, 128)

  context.textAlign = 'right'
  context.font = '400 64px "Pirata One"'
  context.fillStyle = gold
  context.fillText('2026', WIDTH - MARGIN, 128)
  context.textAlign = 'left'

  drawRule(context, 166)

  context.font = '600 44px "Cormorant Garamond"'
  context.fillStyle = cream
  context.fillText('Мой', MARGIN, 220)
  const myWidth = context.measureText('Мой ').width
  context.fillStyle = goldBright
  context.font = '500 italic 44px "Cormorant Garamond"'
  context.fillText('голос', MARGIN + myWidth, 220)

  context.font = '500 13.5px "Manrope"'
  context.fillStyle = 'rgba(239, 231, 214, 0.48)'
  context.fillText(
    `${categories.length} номинаций · один голос в каждой · голосование до ${EVENT.votingEndLabel}`,
    MARGIN,
    252,
  )

  drawRule(context, 278)

  const columns = 2
  const columnGap = 40
  const cellWidth = (WIDTH - MARGIN * 2 - columnGap) / columns
  const rowHeight = 108
  const gridTop = 312

  categories.forEach((category, index) => {
    const column = index % columns
    const row = Math.floor(index / columns)
    const x = MARGIN + column * (cellWidth + columnGap)
    const y = gridTop + row * rowHeight

    if (row > 0) {
      context.fillStyle = 'rgba(205, 181, 124, 0.11)'
      context.fillRect(x, y - 22, cellWidth, 1)
    }

    context.beginPath()
    context.arc(x + 4, y - 5, 2.6, 0, Math.PI * 2)
    context.fillStyle = gold
    context.fill()

    context.font = '700 15px "Manrope"'
    context.fillStyle = 'rgba(236, 217, 167, 0.86)'
    const categoryTitle = fitText(
      context,
      category.title.toLocaleUpperCase('ru'),
      cellWidth - 24,
    )
    context.fillText(categoryTitle, x + 18, y)

    const nominee = category.nominees.find((item) =>
      votes[category.id]?.picks.includes(item.id),
    )

    if (nominee) {
      context.font = '600 30px "Cormorant Garamond"'
      context.fillStyle = cream
      context.fillText(fitText(context, nominee.name, cellWidth - 18), x, y + 38)

      context.font = '500 13px "Manrope"'
      context.fillStyle = 'rgba(239, 231, 214, 0.5)'
      context.fillText(nominee.handle, x, y + 60)
    } else {
      context.font = '500 22px "Manrope"'
      context.fillStyle = 'rgba(239, 231, 214, 0.24)'
      context.fillText('—', x, y + 38)
    }
  })

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob)
      else reject(new Error('Could not create the poster'))
    }, 'image/png')
  })
}
