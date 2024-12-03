import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'
import { renderer } from './renderer'
import { Header } from './components/Header'
import { InputForm } from './components/InputForm'
import { Layout } from './components/Layout'
import './styles.css'

const app = new Hono()

app.use(renderer)
app.use('/static/*', serveStatic({ root: './' }))

app.get('/', (c) => {
  return c.render(
      <Header />
  )
})

app.get('/:year/:day', (c) => { 
  const year = c.req.param('year')
  const day = c.req.param('day')
  return c.render(
    <>
      <Header />
      <InputForm year={year} day={day}/>
    </>

  )
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
