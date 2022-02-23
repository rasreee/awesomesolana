import { NextRouter } from 'next/router';

import { ContentTag, toContentTag } from './tags';

export type Search = {
  query?: string;
  tags?: ContentTag[];
};

export function parseSearch(parsedUrlQuery: NextRouter['query']): Search {
  const search: Search = {};

  if ('query' in parsedUrlQuery) {
    search.query = parsedUrlQuery['query'] as string;
  }
  if ('tags' in parsedUrlQuery) {
    search.tags = (parsedUrlQuery['tags'] as string)
      .split(',')
      .map(toContentTag);
  }

  return search;
}
