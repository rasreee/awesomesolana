import useSWR from 'swr';

import {
  GithubReposBrowseParams,
  GithubReposResponse,
  GithubReposSearchParams,
} from './github.types';
import { githubSwrKey } from './github.utils';

export type UseGithubReposApi = {
  data: GithubReposResponse | undefined;
  error: Error | undefined;
};

export function useGithubReposApi<Route extends '/search' | '/browse'>(
  route: Route,
  params?: Route extends '/search'
    ? Partial<GithubReposSearchParams>
    : Partial<GithubReposBrowseParams>,
  shouldFetch = true,
): UseGithubReposApi {
  const { data, error } = useSWR<GithubReposResponse, Error>(
    shouldFetch ? githubSwrKey.route(route, params) : null,
  );

  return { data, error };
}