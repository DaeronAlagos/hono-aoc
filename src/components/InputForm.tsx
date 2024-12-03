import { Button } from "./Button"

export const InputForm = ({ year, day }: { year: string, day: string }) => {
    return (
        <form action={`/${year}/${day}`} method="post" className="max-w-2xl mx-auto px-4">
            <div className="flex flex-col gap-4">
                <textarea 
                    name="input" 
                    className="h-48 p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
                <button 
                    type="submit" 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
                >
                    Submit
                </button>
            </div>
        </form>
    )
}
