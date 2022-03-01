import { Tag } from '@/domains/tags/types';
import { PaginationParams } from '@/lib/pagination';

export interface GithubUser {
  id: number;
  /* Username */
  login: string;
  /* Profile picture URL */
  avatar_url: string;
  /* User Profile URL */
  html_url: string;
}

export interface RawGitHubRepo {
  id: number;
  /* Handle for the repo */
  name: string;
  full_name: string;
  /* Description of the repo */
  description: string;
  /* Programming language the repo was written with */
  language: string;
  /* Repo Profile URL */
  html_url: string;
  /* When the repo was created */
  created_at: DateString;
  /* When the repo was pushed to */
  pushed_at: DateString;
  /* When the repo was updated */
  updated_at: DateString;
  /* Number of forks */
  forks_count: number;
  /* Number of stars */
  stargazers_count: number;
  /* Number of waters */
  watchers_count: number;
  /* Number of open issues */
  open_issues_count: number;
  /* Owner of the repo */
  owner: GithubUser;
  topics: string[];
  license?: {
    key: string;
    name: string;
    node_id: string;
    url: string;
    spdx_id: string;
  };
}

export interface GithubRepo {
  id: number;
  /* Handle for the repo */
  name: string;
  fullName: string;
  /* Description of the repo */
  description: string;
  /* Programming language the repo was written with */
  language: string;
  /* Repo Profile URL */
  htmlUrl: string;
  /* When the repo was created */
  createdAt: DateString;
  /* When the repo was pushed to */
  pushedAt: DateString;
  /* When the repo was updated */
  updatedAt: DateString;
  /* Number of forks */
  forksCount: number;
  /* Number of stars */
  starsCount: number;
  /* Number of waters */
  watchersCount: number;
  /* Number of open issues */
  openIssuesCount: number;
  /* Owner of the repo */
  owner: GithubUser;
  topics: string[];
  license?: {
    key: string;
    name: string;
    node_id: string;
    url: string;
    spdx_id: string;
  };
}

export type GithubApiParams = {
  tags?: Tag[];
  keywords?: string[];
} & Partial<PaginationParams>;

export type RawGithubReposData = {
  incomplete_results: boolean;
  items: RawGitHubRepo[];
  total_count: number;
};

export type GithubReposData = {
  totalCount: number;
  incompleteResults: boolean;
  items: GithubRepo[];
};

export interface GithubReposSearchParams extends PaginationParams {
  keywords: string[];
  tags: Tag[];
}

export interface GithubReposBrowseParams extends PaginationParams {}