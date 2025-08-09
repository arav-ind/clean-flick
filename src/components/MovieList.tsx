import { createResource, For, Show } from "solid-js"
import TileItem from "./TileItem"
import { BASE_URL } from "../api/api"
import { useSearchParams } from "@solidjs/router"

// Simple in-memory cache object
const cache: Record<string, any[]> = {}

async function fetchTitles(query: string) {
    if (!query.trim()) return []

    // Return cached if available
    if (cache[query]) {
        return cache[query]
    }

    const res = await fetch(
        `${BASE_URL}/search/titles?query=${encodeURIComponent(query)}&limit=5`,
        { headers: { accept: "application/json" } }
    )
    if (!res.ok) throw new Error("Failed to fetch")
    const data = await res.json()

    // Cache the result
    cache[query] = data.titles || []
    return cache[query]
}

export default function MovieList() {
    const [searchParams] = useSearchParams()
    const query = () => searchParams.q || ""

    const [results] = createResource(query, fetchTitles, {
        initialValue: [],
    })

    return (
        <div class="p-4">
            <Show
                when={results().length > 0}
                fallback={<div class="text-gray-500">Type to search...</div>}
            >
                <div class="flex gap-4 flex-wrap justify-center">
                    <For each={results()}>
                        {(item) => <TileItem item={item} />}
                    </For>
                </div>
            </Show>
        </div>
    )
}
