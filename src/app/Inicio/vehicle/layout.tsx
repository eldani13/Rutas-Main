"use client"
import { Suspense } from "react"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <>
            <Suspense fallback={(
                <div>
                    <p>...</p>
                </div>
            )}>
                {children}
            </Suspense>
        </>
    )
}
