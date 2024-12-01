export const day1 = (input: string) => {
    const lines = input.split('\n')
    const list1 = lines.map(line => parseInt(line.trim().split(/\s+/)[0], 10)).sort((a, b) => a - b)
    const list2 = lines.map(line => parseInt(line.trim().split(/\s+/)[1], 10)).sort((a, b) => a - b)
    const differences: number[] = []
    for (let i = 0; i < list1.length; i++) {
      differences.push(Math.abs(list1[i] - list2[i]))
    }
    const list1Filtered = list1.filter(n => !isNaN(n))
    const list2Filtered = list2.filter(n => !isNaN(n))
  
    const differencesSum = differences.reduce((a, b) => a + b, 0)
  
    const similarityScore = list1Filtered.reduce((acc, n, i) => {
      const count = list2Filtered.filter(x => x === n).length
      return acc + (n * count)
    }, 0)

    return {
        partOne: differencesSum,
        partTwo: similarityScore
    }
}
