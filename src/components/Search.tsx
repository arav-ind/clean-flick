import { createSignal, onCleanup } from 'solid-js'
import { FiSearch } from 'solid-icons/fi'
import MovieList from './MovieList'

interface InputEvent extends Event {
    currentTarget: HTMLInputElement
    target: Element
}

export default function Search() {
    const [debouncedQuery, setDebouncedQuery] = createSignal('')
    let debounceTimer: ReturnType<typeof setTimeout>

    const handleInput = (e: InputEvent) => {
        const value = e.currentTarget.value
        clearTimeout(debounceTimer)
        debounceTimer = setTimeout(() => {
            setDebouncedQuery(value)
        }, 500)
    }

    onCleanup(() => {
        clearTimeout(debounceTimer)
    })

    return (
        <>
            <div class='w-96 p-3 relative flex rounded-md border justify-center items-center'>
                <input
                    type='search'
                    placeholder='Search for Movies, TV Shows...'
                    class='w-full focus:outline-none'
                    aria-label='Search'
                    onInput={handleInput}
                />
                <FiSearch />
            </div>
            <MovieList debouncedQuery={debouncedQuery} />
        </>
    )
}
