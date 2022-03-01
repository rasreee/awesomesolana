import { NextApiRequest, NextApiResponse } from 'next';

import {
  githubApiUrl,
  githubJsonFetch,
  GithubReposBrowseParams,
  RawGithubReposResponse,
} from '@/domains/github';
import { defaultPaginationParams } from '@/lib/pagination';

export type GithubReposBrowseRequest = NextApiRequest & {
  query: Partial<GithubReposBrowseParams>;
};

export default async function githubReposBrowseApiHandler(
  req: GithubReposBrowseRequest,
  res: NextApiResponse<RawGithubReposResponse>,
) {
  const {
    page = defaultPaginationParams.page,
    per_page = defaultPaginationParams.per_page,
  } = req.query;

  const params = { page, per_page };

  const data = await githubJsonFetch(githubApiUrl.browseRepos(params));

  return res.status(200).json(data);
}
