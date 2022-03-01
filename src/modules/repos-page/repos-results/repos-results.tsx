import { observer } from 'mobx-react-lite';
import dynamic from 'next/dynamic';

import { GithubApiParams } from '@/domains/github';
import { useGithubReposApi } from '@/hooks/useGithubReposApi';
import { useGlobalStore } from '@/stores';
import { ErrorMessage } from '@/ui/error-message';

import { ReposResultsInfo } from './repos-results-info';

const ReposFeed = dynamic(() => import('./repos-feed'));

const ReposResults = observer(function ReposResults() {
  const store = useGlobalStore();
  const shouldSearch = Boolean(
    store.reposSearch.tags.length || store.reposSearch.query.trim(),
  );

  const request: { route: '/search' | '/browse'; params?: GithubApiParams } =
    shouldSearch
      ? {
          route: '/search',
          params: {
            tags: store.reposSearch.tags,
            keywords: [store.reposSearch.query],
          },
        }
      : { route: '/browse' };

  const { data, error } = useGithubReposApi(request.route, request.params);

  if (error) return <ErrorMessage>{error?.message}</ErrorMessage>;

  if (!data) return <ul>...</ul>;

  return (
    <>
      <ReposResultsInfo data={data} params={request.params} />
      <ReposFeed data={data} />
    </>
  );
});

export default ReposResults;
