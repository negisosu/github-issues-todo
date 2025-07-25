export const parseMarkdownToChecklist = (markdown: string): {id: number, text: string, checked: boolean}[] => {
    const lines = markdown.split("\n")
    const checkList = /^- \[( |x)\] (.+)$/i

    return lines.map((line, i) => {
        const match = line.match(checkList)
        if(!match) return null
        const text = match[2].trim()
        const checked = match[1].toLocaleLowerCase() === 'x'
        return {
            id: i,
            text,
            checked
        }
    }).filter(item => item !== null)
}

export const parseChecklistToMarkdown = (checklist: {id: string, text: string, checked: boolean}[]): string => {
    return checklist.filter(todo => todo.text != "").reduce((acc, cur) => {
        return acc + `- [${cur.checked ? "x" : " "}] ${cur.text}\n`
    }, "")
}