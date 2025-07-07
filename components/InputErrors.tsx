export function InputErrors({ errors }: { errors: string[] | undefined | null}){
    return(
        <div>
        {
            errors
            ?
            errors.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                </p>
            ))
            :
            <></>
        }
        </div>
    )
}