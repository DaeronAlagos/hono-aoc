interface Challenge {
  year: string;
  days: string[];
}

const challenges = [
  {
    year: 2024,
    days: [1, 2, 3]
  },
  {
    year: 2024,
    days: [1]
  }
]

export const ChallengeList = () => {
  return (
    <div className="p-4">
      <div className="space-y-4">
        {challenges.map((challenge) => (
          <div key={challenge.year} className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">Year {challenge.year}</h3>
            <div className="grid grid-cols-4 gap-2">
              {challenge.days.map((day) => (
                <a 
                  href={`/${challenge.year}/${day}`}
                  key={`${challenge.year}-${day}`}
                  className="p-1 rounded hover:bg-gray-200 cursor-pointer text-center"
                >
                  {day}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}