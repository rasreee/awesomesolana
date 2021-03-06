function formatGitHubTopic(name: string) {
  return name.replaceAll(".", "").replaceAll(" ", "-").toLowerCase();
}

function formatTagSearchParam(tag: Tag): string {
  if (tag.type === "language") return `language:${tag.name}`;
  if (tag.type === "topic") return `topic=${tag.name}`;
  if (tag.type === "framework") {
    return `topic=${formatGitHubTopic(tag.name)}`;
  }
  return "";
}

type Pagination = { page: number; per_page: number };

const defaultPagination = { page: 0, per_page: 10 };

function formatGithubApiQuery({
  keywords = [],
  tags = [],
  page = defaultPagination.page,
  per_page = defaultPagination.per_page,
}: Partial<Pagination> & Partial<{ keywords: string[]; tags: Tag[] }>): string {
  const params = [
    ...keywords.map((keyword) => keyword.trim()),
    ...tags.map(formatTagSearchParam),
  ]
    .filter(Boolean)
    .join("+");

  const query = params.length ? `?q=${params}` : "";
  const pagination = `${query ? "&" : "?"}page=${page}&per_page=${per_page}`;

  return `${query}${pagination}`;
}

const getSolanaGithubReposQueryUrl = (params: any) => {
  return [
    "/search/repositories",
    formatGithubApiQuery({ keywords: ["solana"], ...params }),
  ].join("");
};

export const githubApiUrl = {
  baseUrl: "https://api.github.com",
  browseRepos: (params: any = defaultPagination): string =>
    [githubApiUrl.baseUrl, getSolanaGithubReposQueryUrl(params)].join(""),
};

import fetch from "node-fetch";
import { Headers, HeadersInit } from "node-fetch";

import environment from "./environment";
