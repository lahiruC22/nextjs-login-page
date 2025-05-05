interface TestimonialProps {
    quote: string
    author: string
    position: string
    activeIndex?: number
}

export function Testimonial({ quote, author, position, activeIndex = 0 }: TestimonialProps) {
    return (
        <>
            <div className="absolute bottom-32 left-8 right-8 z-20 rounded-lg bg-black/40 p-6 backdrop-blur-sm">
                <p className="mb-4 text-xl text-white">&quot;{quote}&quot;</p>
                <p className="text-lg font-medium text-white">
                    {author} - {position}
                </p>
            </div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className={`h-2 w-8 rounded-full ${i === activeIndex ? "bg-[#6b61d2]" : "bg-white/40"}`}></div>
                ))}
            </div>
        </>
    )
}
