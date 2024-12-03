import { Hono } from 'hono'
import { renderer } from './renderer'
import { Header } from './components/Header'
import { InputForm } from './components/InputForm'
import { Solution } from './components/Solution'

const app = new Hono()

app.use(renderer)

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

  const challenge = await import(`./challenges/${year}/day${day}.ts`)
  const result = challenge.default(input)

  return c.render(
    <>
      <Header />
      <Solution part1={result.partOne} part2={result.partTwo} />
    </>
  )
})

export default app
