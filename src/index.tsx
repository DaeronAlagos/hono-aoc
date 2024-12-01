import { Hono } from 'hono'
import { renderer } from './renderer'

const app = new Hono()

app.use(renderer)

app.get('/', (c) => {
  return c.render(<h1>Advent of Code with Hono</h1>)
})

app.get('/:year/:day', (c) => { 
  const year = c.req.param('year')
  const day = c.req.param('day')
  return c.render(<form action={`/${year}/${day}`} method="post">
    <textarea name="input" style={{ width: '100%', height: '300px' }}></textarea>
    <button type="submit">Submit</button>
  </form>)
})

app.post('/:year/:day', async (c) => {
  const year = c.req.param('year')
  const day = c.req.param('day')
  const body = await c.req.parseBody()
  const input = body.input

  const challengeYear = await import(`./challenges/${year}.ts`)
  const challenge = challengeYear[`day${day}`]
  try {
    challenge(input)
  } catch (error) {
    return c.render(
      <div>
        <h1>Advent of Code {year} Day {day}</h1>
        <h2>Solution not found</h2>
      </div>
    )
  }
  const result = challenge(input)

  return c.render(
    <div>
      <h1>Advent of Code {year} Day {day}</h1>
      <h2>Solution</h2>
      <h3>Part 1: {result.partOne}</h3><h3>Part 2: {result.partTwo}</h3>
    </div>
  )
})

export default app
