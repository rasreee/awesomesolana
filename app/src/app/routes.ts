import { Tag } from '@awesomesolana/common';

export const appRoute = {
  repos: {
    all: '/repos' as const,
    search: ({ tags }: { tags: Tag[] } = { tags: [] }) =>
      appRoute.repos.all +
      `${tags.length ? '?' : ''}${tags
        .map((tag) => `${tag.type}=${tag.name.toLowerCase()}`)
        .join('&')}`,
  },
};
