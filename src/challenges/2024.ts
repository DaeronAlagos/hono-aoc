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

export const day2 = (input: string) => {
  const reports = input.split('\n').map(line => 
      line.split(' ').map(n => parseInt(n, 10))
  );

  function isReportSafe(levels: number[]): boolean {
      // Check if levels are increasing or decreasing
      let isIncreasing: boolean | null = null;
      
      for (let i = 1; i < levels.length; i++) {
          const diff = levels[i] - levels[i - 1];
          
          // Check if difference is between 1 and 3 (inclusive)
          if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
              return false;
          }
          
          // Determine direction on first comparison
          if (isIncreasing === null) {
              isIncreasing = diff > 0;
          }
          // Check if direction remains consistent
          else if ((diff > 0) !== isIncreasing) {
              return false;
          }
      }
      
      return true;
  }

  function isReportSafeWithDampener(levels: number[]): boolean {
    // First check if it's already safe without removing any level
    if (isReportSafe(levels)) {
      return true;
    }

    // Try removing each level one at a time
    for (let i = 0; i < levels.length; i++) {
      const modifiedLevels = [...levels.slice(0, i), ...levels.slice(i + 1)];
      if (isReportSafe(modifiedLevels)) {
        return true;
      }
    }

    return false;
  }

  const safeReports = reports.filter(isReportSafe).length;
  const safeReportsWithDampener = reports.filter(isReportSafeWithDampener).length;

  return {
    partOne: safeReports,
    partTwo: safeReportsWithDampener
  };
};

export const day3 = (input: string) => {
  // Regular expressions for all instruction types
  const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;
  const doRegex = /do\(\)/g;
  const dontRegex = /don't\(\)/g;
  
  let sum = 0;
  let enabled = true;  // Multiplications are enabled by default
  let lastIndex = 0;
  
  // Find all instructions in order of appearance
  while (true) {
    // Find the next occurrence of each type of instruction
    mulRegex.lastIndex = lastIndex;
    doRegex.lastIndex = lastIndex;
    dontRegex.lastIndex = lastIndex;
    
    const mulMatch = mulRegex.exec(input);
    const doMatch = doRegex.exec(input);
    const dontMatch = dontRegex.exec(input);
    
    // Find the earliest instruction
    const mulIndex = mulMatch ? mulMatch.index : Infinity;
    const doIndex = doMatch ? doMatch.index : Infinity;
    const dontIndex = dontMatch ? dontMatch.index : Infinity;
    
    if (mulIndex === Infinity && doIndex === Infinity && dontIndex === Infinity) {
      break;  // No more instructions found
    }
    
    // Process the earliest instruction
    if (doIndex < mulIndex && doIndex < dontIndex) {
      enabled = true;
      lastIndex = doIndex + 4;  // Length of "do()"
    } else if (dontIndex < mulIndex && dontIndex < doIndex) {
      enabled = false;
      lastIndex = dontIndex + 7;  // Length of "don't()"
    } else {
      if (enabled && mulMatch) {
        const x = parseInt(mulMatch[1], 10);
        const y = parseInt(mulMatch[2], 10);
        sum += x * y;
      }
      lastIndex = mulIndex + mulMatch![0].length;
    }
  }

  return {
    partOne: sum,
    partTwo: sum  // Same calculation as part one
  };
};