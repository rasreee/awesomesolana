import { ApiData, isApiError, SourceType } from '@awesomesolana/common';
import { classed } from '@awesomesolana/tw';
import { ErrorMessage, FeedSkeleton } from '@awesomesolana/ui';
import useSWR from 'swr';

import { GithubRepo } from '@/domains/github';

const FeedList = classed(
  'ul',
  'flex flex-col divide-y divide-base-300 dark:divide-base-700',
);

const PopularRepos = () => {
  const { data, error } = useSWR<ApiData<GithubRepo[]>, Error>(
    `/api/sources/popular?type=${SourceType.Repo}`,
  );

  if (!data) return <FeedSkeleton n={5} />;

  if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

  if (isApiError(data)) return <ErrorMessage>{data.message}</ErrorMessage>;

  return (
    <FeedList>
      {data.map((hit) => (
        <li key={hit.id}>{JSON.stringify(hit, null, 2)}</li>
      ))}
    </FeedList>
  );
};

export default PopularRepos;
