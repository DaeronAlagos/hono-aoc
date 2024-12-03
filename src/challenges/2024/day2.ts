const day2 = (input: string) => {
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

  export default day2
  