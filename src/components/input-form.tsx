export const InputForm = ({ year, day }: { year: string, day: string }) => {
    return (
        <form action={`/${year}/${day}`} method="post">
            <textarea name="input" className="w-full h-96 p-4"></textarea>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
        </form>
    )
}
