import { computed, makeAutoObservable } from 'mobx';

import { createRequestStore } from '@/lib/mobx/request-store';
import { getTagSuggestions, Tag } from '@/modules/tags';
import { ITagsSearchStore } from '@/stores/interfaces';
import { useRootStore } from '@/stores/root-store';
import type { TextInputProps } from '@/ui/text-input';

export class TagsSearchStore implements ITagsSearchStore {
  constructor() {
    makeAutoObservable(this, {}, { name: 'TagsSearchStore' });
  }

  hits: Tag[] = [];
  query = '';

  request = createRequestStore();

  setHits = (hits: Tag[]) => {
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

  onSubmit = async (query: string) => {
    if (!query) return this.setHits([]);

    this.request.setLoading(true);
    this.request.setError(null);
    try {
      const response = await getTagSuggestions(query);
      this.setHits(response);
    } catch (error) {
      this.request.setError(error);
    } finally {
      this.request.setLoading(false);
    }
  };

  onReset = () => {
    this.query = '';
    this.hits = [];
    this.request.onReset();
  };
}

export const useTagsSearchStore = (): TagsSearchStore =>
  useRootStore().tagsSearch;