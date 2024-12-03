import fs from 'fs';
import path from 'path';

interface Challenge {
    year: string;
    days: number[];
}

export function generateChallengeList(): Challenge[] {
    const challengesDir = path.join(process.cwd(), 'src', 'challenges');
    const years = fs.readdirSync(challengesDir)
        .filter(file => fs.statSync(path.join(challengesDir, file)).isDirectory())
        .sort((a, b) => b.localeCompare(a)); // Sort years in descending order

    return years.map(year => {
        const yearDir = path.join(challengesDir, year);
        const days = fs.readdirSync(yearDir)
            .filter(file => file.endsWith('.ts'))
            .map(file => file.replace('.ts', ''))
            .map(file => parseInt(file.replace('day', ''), 10))
            .sort((a, b) => a - b);

        return {
            year,
            days
        };
    });
}
