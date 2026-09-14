"use client"

import { useEffect, useRef } from "react"
import { Globe } from "lucide-react"

const COMPANIES = [
    "Google", "Microsoft", "Amazon", "Meta", "Netflix", "Apple", "Stripe", "Vercel", "OpenAI", "Adobe", "Airbnb", "Tesla"
]

export function TrustedBy() {
    return (
        <section className="relative border-y border-hairline bg-secondary/30 py-12 overflow-hidden">
            <div className="relative mx-auto max-w-7xl px-5 mb-8">
                <div className="flex flex-col items-center justify-center text-center">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-hairline bg-secondary px-3 py-1 text-xs font-medium text-primary">
                        <Globe className="h-3.5 w-3.5" />
                        <span>Where Our Students Work</span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-normal font-serif tracking-tight text-foreground/90">
                        Our graduates work at leading technology companies:
                    </h2>
                </div>
            </div>

            <div className="marquee-wrapper relative flex w-full overflow-hidden">
                <div
                    className="flex whitespace-nowrap animate-marquee items-center gap-16 px-8 py-3"
                    style={{ animationDuration: '50s' }}
                >
                    {[...COMPANIES, ...COMPANIES].map((company, idx) => (
                        <div 
                            key={`${company}-${idx}`} 
                            className="group flex items-center space-x-2 transition-all duration-300"
                        >
                            <span className="text-xl md:text-2xl font-medium tracking-tight text-muted-foreground/40 transition-colors duration-200 group-hover:text-foreground cursor-default">
                                {company}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
