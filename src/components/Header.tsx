import { ChallengeList } from "./ChallengeList"

export const Header = () => {
    return (
        <header className="w-full shadow-lg">
            <div className="mx-auto max-w-7xl text-center py-6 px-4 bg-[repeating-linear-gradient(45deg,#166534,#166534_10px,#15803d_10px,#15803d_20px)] bg-gradient-to-r from-red-600/90 to-green-700/90">
                <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                    🎄 Advent of Code with Hono ⭐
                </h1>
            </div>
            <ChallengeList />
        </header>
    )
}
