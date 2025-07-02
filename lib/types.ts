import { Endpoints } from "@octokit/types";

export type Repo = Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"];

export type Repos = Endpoints["GET /users/{username}/repos"]["response"]["data"];