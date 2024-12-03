const day3 = (input: string) => {
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

  export default day3
  