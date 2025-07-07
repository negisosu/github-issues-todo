import { Endpoints } from "@octokit/types";

export type Repo = Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"];

export type Repos = Endpoints["GET /users/{username}/repos"]["response"]["data"];

export type Issue = Endpoints["GET /repos/{owner}/{repo}/issues/{issue_number}"]["response"]["data"];

export type Issues = Endpoints["GET /repos/{owner}/{repo}/issues"]["response"]["data"];

export type Comment = Endpoints["GET /repos/{owner}/{repo}/issues/comments/{comment_id}"]["response"]["data"];

export type Comments = Endpoints["GET /repos/{owner}/{repo}/issues/comments"]["response"]["data"];