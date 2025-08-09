import { useParams } from '@solidjs/router'
import { BASE_URL } from '../api/api'
import { createResource, For, Show } from 'solid-js'

async function getParentalRating(id: string) {
    if (!id.trim()) return []
    const res = await fetch(
        `${BASE_URL}/titles/${id}/parentsGuide`,
        { headers: { accept: 'application/json' } }
    )
    if (!res.ok) throw new Error('Failed to fetch')
    const data = await res.json()
    return data.parentsGuide || []
}

export default function MovieDetails() {
    const params = useParams<{ id: string }>()
    const [results] = createResource(params.id, getParentalRating, {
        initialValue: [],
    })
    return (
        <div class='p-4'>
            <h1 class='text-2xl font-bold'>Parental Guidance</h1>
            <p class='mt-2'>{params.id}</p>
            <Show when={results()}>
                <For each={results()}>
                    {(item) => <p>{item.category}</p>}
                </For>
            </Show>
        </div>
    )
}