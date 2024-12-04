interface Challenge {
  year: string;
  days: string[];
}

const challenges = [
  {
    year: 2024,
    days: [
      {
        number: 1,
        title: 'Historian Hysteria'
      },
      {
        number: 2,
        title: 'Red-Nosed Reports'
      },
      {
        number: 3,
        title: 'Mull It Over'
      },
      {
        number: 4,
        title: 'Ceres Search'
      },
    ]
  },
  {
    year: 2023,
    days: [
      {
        number: 1,
        title: 'Reindeer Olympics'
      }
    ]
  }
]

export const ChallengeList = () => {
  return (
    <div className="mx-auto max-w-7xl py-4">
      <div className="space-y-4">
        {challenges.map((challenge) => (
          <div key={challenge.year} className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">Year {challenge.year}</h3>
            <div className="flex gap-2">
              {challenge.days.map((day) => (
                <a 
                  href={`/${challenge.year}/${day.number}`}
                  key={`${challenge.year}-${day.number}`}
                  className="py-2 px-4 rounded bg-gray-100 hover:bg-gray-200 cursor-pointer text-center"
                >
                  {day.number}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}