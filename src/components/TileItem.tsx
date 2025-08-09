import { useNavigate } from '@solidjs/router'
import { Show } from 'solid-js'

export default function TileItem({ item }) {
    const navigate = useNavigate()
    return (
        <div class='flex flex-col cursor-pointer' onClick={() => navigate(`/details/${item.id}`)}>
            <div class='w-28 h-48 relative overflow-hidden rounded-md shadow-lg border-1'>
                <img
                    class="w-full h-full object-cover"
                    src={item.primaryImage?.url}
                    alt={item.originalTitle}
                    loading="lazy"
                    decoding="async" />
            </div>
            <p class='w-28'>{item.originalTitle} <Show when={item.startYear}><span>({item.startYear})</span></Show></p>
        </div>
    )
}