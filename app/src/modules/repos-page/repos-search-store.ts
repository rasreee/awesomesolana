import { computed, makeAutoObservable } from 'mobx';

import {
  GithubRepo,
  GithubReposSearchParams,
  githubSwrKey,
  parseRawGitHubRepo,
  RawGithubReposData,
} from '@/domains/github';
import { tagUtils } from '@/domains/tags/tags.utils';
import { Tag, TagType } from '@/domains/tags/types';
import getEnvVar from '@/lib/getEnvVar';
import { createRequestStore } from '@/lib/mobx/request-store';
import { IReposSearchStore } from '@/stores/interfaces';
import type { TextInputProps } from '@/ui/text-input';

import { SearchFormData } from '../common/search-form/types';

async function searchGithubRepos(
  params: Partial<GithubReposSearchParams>,
): Promise<RawGithubReposData> {
  const res = await fetch(
    getEnvVar('BASE_URL') + githubSwrKey.route('/search', params),
  );

  return res.json();
}

export class ReposSearchStore implements IReposSearchStore {
  constructor() {
    makeAutoObservable(this, {}, { name: 'ReposSearchStore' });
  }

  hits: GithubRepo[] = [];
  tags: Tag[] = [];
  query = '';

  request = createRequestStore();

  setHits = (hits: GithubRepo[]) => {
    this.hits = hits;
  };

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.query = event.currentTarget.value;
  };

  getTextInputProps = (props?: Partial<TextInputProps>): TextInputProps =>
    computed(() => ({
      ...props,
      value: this.query,
      onChange: this.onChange,
    })).get();

  onSubmit = async ({ query, filters }: SearchFormData) => {
    if (!query && !filters.length) return this.setHits([]);

    this.request.setLoading(true);
    this.request.setError(null);
    try {
      const response = await searchGithubRepos({
        keywords: [query],
        tags: filters,
      });
      this.setHits(
        response.items.map((rawData) => parseRawGitHubRepo(rawData)),
      );
    } catch (error) {
      this.request.setError(error);
    } finally {
      this.request.setLoading(false);
    }
  };

  onReset = () => {
    this.query = '';
    this.request.onReset();
  };

  addTag = (tag: Tag) => {
    this.tags = [...this.tags, tag];
  };

  removeTag = (tag: Tag) => {
    this.tags = tagUtils.list(this.tags).exclude([tag]);
  };

  toggleTag = (tag: Tag) => {
    if (tagUtils.list(this.tags).has(tag)) return this.removeTag(tag);

    this.addTag(tag);
  };

  clearTags = (type: TagType) => {
    this.tags = this.tags.filter((tag) => tag.type !== type);
  };
}
