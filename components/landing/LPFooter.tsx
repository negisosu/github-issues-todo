export function LPFooter() {
    return(
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
            <p className="text-xs text-muted-foreground">{new Date().getFullYear()} GitHub Issues TODO</p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                <div className="text-xs hover:underline underline-offset-4">
                    お問い合わせ: negigi0404@gmail.com
                </div>
            </nav>
        </footer>
    )
}