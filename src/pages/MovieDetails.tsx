import { useParams } from '@solidjs/router'

export default function MovieDetails() {
    const params = useParams<{ id: string }>()
    return (
        <div class='p-4'>
            <h1 class='text-2xl font-bold'>Movie Details</h1>
            <p class='mt-2'>{params.id}</p>
        </div>
    )
}