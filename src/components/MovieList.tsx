import { createResource, For, Show, Accessor } from 'solid-js'
import TileItem from './TileItem'
import { BASE_URL } from '../api/api'
import { useSearchParams } from '@solidjs/router'

async function fetchTitles(query: string) {
    if (!query.trim()) return []
    const res = await fetch(
        `${BASE_URL}/search/titles?query=${encodeURIComponent(query)}`,
        { headers: { accept: 'application/json' } }
    )
    if (!res.ok) throw new Error('Failed to fetch')
    const data = await res.json()
    return data.titles || []
}

export default function MovieList() {
    const [searchParams] = useSearchParams()
    const query = () => searchParams.q || ""
    const [results] = createResource(query, fetchTitles, {
        initialValue: [],
    })

    return (
        <div class='p-4'>
            <Show
                when={results().length > 0}
                fallback={<div class='text-gray-500'>Type to search...</div>}
            >
                <div class='flex gap-4 flex-wrap justify-center'>
                    <For each={results()}>
                        {(item) => <TileItem item={item} />}
                    </For>
                </div>
            </Show>
        </div>
    )
}
