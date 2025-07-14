export function MySubTitle({ children }: { children: React.ReactNode}) {
    return(
        <div className="my-2 sm:my-4 text-lg sm:text-2xl font-bold">
            {children}
        </div>
    )
}