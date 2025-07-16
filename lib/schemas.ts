import { z } from "zod"

export const IssueSchema = z.object({
    id: z.string(),
    title: z.string(),
    body: z.string(),
    owner: z.string(),
    repo: z.string()
})

export const CreateIssue = IssueSchema.omit({ id: true })

export type createIssueType = z.infer<typeof CreateIssue>

export type createIssueKeys = keyof createIssueType

export type createIssueErrors = {
    [K in createIssueKeys]?: string[]
}

export type createIssueState = {
    errors?: createIssueErrors;
    message?: string;
}

export const SelectIssue = z.object({
    owner: z.string(),
    repo: z.string(),
    issuesNumber: z.number()
})

export type selectIssueType = z.infer<typeof SelectIssue>

export type selectIssueKeys = keyof selectIssueType

export type selectIssueErrors = {
    [K in selectIssueKeys]?: string[]
}

export type selectIssueState = {
    errors?: selectIssueErrors;
    message?: string;
}