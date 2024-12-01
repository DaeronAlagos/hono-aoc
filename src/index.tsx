import { Hono } from 'hono'
import { renderer } from './renderer'

const app = new Hono()

app.use(renderer)

app.get('/', (c) => {
  return c.render(<h1>Advent of Code with Hono</h1>)
})


app.get('/2024/1', (c) => {

  const sampleInput = `3   4
      4   3
      2   5
      1   3
      3   9
      3   3`

  const lines = sampleInput.split('\n')
  const list1 = lines.map(line => parseInt(line.trim().split(/\s+/)[0], 10)).sort((a, b) => a - b)
  const list2 = lines.map(line => parseInt(line.trim().split(/\s+/)[1], 10)).sort((a, b) => a - b)
  const differences: number[] = []
  for (let i = 0; i < list1.length; i++) {
    differences.push(Math.abs(list1[i] - list2[i]))
  }
  const list1Filtered = list1.filter(n => !isNaN(n))
  const list2Filtered = list2.filter(n => !isNaN(n))

  const differencesSum = differences.reduce((a, b) => a + b, 0)

  console.log(list1)
  console.log(list2)
  console.log(differences)
  console.log(differencesSum)

  const similarityScore = list1Filtered.reduce((acc, n, i) => {
    const count = list2Filtered.filter(x => x === n).length
    return acc + (n * count)
  }, 0)

  console.log(similarityScore)

  return c.render(
    <h1>Advent of Code 2024 Day 1: {differencesSum} {similarityScore}</h1>
  )
})

export default app
