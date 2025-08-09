import { createSignal, onCleanup, onMount } from "solid-js"

type OptimizedImageProps = {
    src: string
    alt: string
    placeholder?: string // optional low-res or SVG placeholder
    fallback?: string    // optional fallback if image fails
    class?: string
}

export default function OptimizedImage(props: OptimizedImageProps) {
    const [isVisible, setIsVisible] = createSignal(false)
    const [isLoaded, setIsLoaded] = createSignal(false)
    const [hasError, setHasError] = createSignal(false)

    let imgRef: HTMLImageElement | undefined
    let observer: IntersectionObserver | undefined

    onMount(() => {
        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true)
                        observer?.disconnect()
                    }
                })
            },
            { rootMargin: "100px" } // preload before entering viewport
        )

        if (imgRef) observer.observe(imgRef)
    })

    onCleanup(() => observer?.disconnect())

    return (
        <div class={`relative overflow-hidden ${props.class || ""}`}>
            {/* Placeholder */}
            {props.placeholder && !isLoaded() && (
                <img
                    src={props.placeholder}
                    alt={props.alt}
                    class="absolute inset-0 w-full h-full object-cover blur-md scale-105"
                />
            )}

            {/* Main Image */}
            {isVisible() && (
                <img
                    ref={imgRef}
                    src={hasError() ? props.fallback || props.placeholder || "" : props.src}
                    alt={props.alt}
                    loading="lazy"
                    decoding="async"
                    onLoad={() => setIsLoaded(true)}
                    onError={() => setHasError(true)}
                    class={`transition-opacity duration-500 object-cover w-full h-full ${isLoaded() ? "opacity-100" : "opacity-0"
                        }`}
                />
            )}
        </div>
    )
}
