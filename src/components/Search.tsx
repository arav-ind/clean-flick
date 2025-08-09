import { createSignal, onCleanup } from 'solid-js'
import { FiSearch } from 'solid-icons/fi'
import MovieList from './MovieList'
import { useSearchParams } from '@solidjs/router'

interface InputEvent extends Event {
    currentTarget: HTMLInputElement
    target: Element
}

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams()
    let debounceTimer: ReturnType<typeof setTimeout>

    const handleInput = (e: InputEvent) => {
        const value = e.currentTarget.value
        clearTimeout(debounceTimer)
        debounceTimer = setTimeout(() => {
            setSearchParams({ q: value })
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
                    value={searchParams.q || ''}
                />
                <FiSearch />
            </div>
            <MovieList />
        </>
    )
}
