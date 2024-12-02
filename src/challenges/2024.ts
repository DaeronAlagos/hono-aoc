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