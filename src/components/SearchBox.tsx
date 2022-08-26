import { useRef } from "react"

interface Props {
    onSubmitSearch: (name: string|undefined) => void 
}

export const SearchBox = ({ onSubmitSearch }: Props) => {

    const inputName = useRef<HTMLInputElement>(null)

    const onClickSubmit = (event: any) => {
        event.preventDefault()

        onSubmitSearch(inputName?.current?.value)
    }

    return (
        <form className="flex items-center mb-4" onSubmit={onClickSubmit}>   
            <label htmlFor="voice-search" className="sr-only">Search</label>
            <div className="relative w-full">
                <input 
                    ref={inputName}
                    type="text" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="Cari Nama Kota" 
                    required
                />
            </div>
            <button className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Search
            </button>
        </form>
    )
}