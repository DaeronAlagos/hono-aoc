const day1 = (input: string) => {
    const lines = input.split('\n')
    const numberMap: { [key: string]: string } = {
        'one': '1', 'two': '2', 'three': '3', 'four': '4',
        'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9'
    }
    
    const partOne = lines.reduce((sum, line) => {
        const digits = line.match(/\d/g)
        if (!digits) return sum
        const firstDigit = digits[0]
        const lastDigit = digits[digits.length - 1]
        return sum + parseInt(firstDigit + lastDigit)
    }, 0)

    const partTwo = lines.reduce((sum, line) => {
        const pattern = /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g
        const matches = Array.from(line.matchAll(pattern), m => m[1])
        if (!matches.length) return sum
        
        let first = matches[0]
        let last = matches[matches.length - 1]
        
        if (isNaN(parseInt(first))) {
            first = numberMap[first]
        }
        if (isNaN(parseInt(last))) {
            last = numberMap[last]
        }
        
        return sum + parseInt(first + last)
    }, 0)

    return {
        partOne,
        partTwo
    }
}

export default day1
