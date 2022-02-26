import {
  githubApi,
  GitHubApiResponse,
  githubFetch,
  GithubReposSearchParams,
} from '@api/github';
import { DEFAULT_PAGINATION_PARAMS } from '@utils';
import { NextApiRequest, NextApiResponse } from 'next';

export type GitHubSearchReposRequest = NextApiRequest & {
  query: Partial<GithubReposSearchParams>;
};

export default async function githubApiHandler(
  req: GitHubSearchReposRequest,
  res: NextApiResponse<GitHubApiResponse>,
) {
  const {
    q = '',
    page = DEFAULT_PAGINATION_PARAMS.page,
    per_page = DEFAULT_PAGINATION_PARAMS.per_page,
    tags = [],
  } = req.query;

  const params = { q, page, per_page, tags };

  const reposResponse = await githubFetch(githubApi.searchRepos(params));

  const data = (await reposResponse.json()) as GitHubApiResponse;

  return res.status(200).json(data);
}
