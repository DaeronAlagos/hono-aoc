interface SolutionProps {
    part1: string | number;
    part2: string | number;
}

export const Solution = ({part1, part2}: SolutionProps) => {
    return (
        <div className="max-w-2xl mx-auto px-4">
            <div className="flex flex-col gap-4 mt-16">
                <h2 className="text-2xl font-bold">Solution</h2>
                <h3 className="text-xl font-bold">Part 1: {part1}</h3><h3 className="text-xl font-bold">Part 2: {part2}</h3>
            </div>
        </div>
    );
};
