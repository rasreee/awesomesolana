import { RequestStore } from '@/lib/mobx/request-store';
import { GithubRepo } from '@/modules/github';
import { Tag, TagType } from '@/modules/tags';
import { TextInputProps } from '@/ui/text-input';

interface TagsSearchState {
  hits: Tag[];
  query: string;
}

export interface ITagsSearchStore extends TagsSearchState {
  setHits: (hits: Tag[]) => void;
  onSubmit: (query: string) => any;
  onReset: () => void;
  request: RequestStore;
  getTextInputProps: (props?: Partial<TextInputProps>) => TextInputProps;
}

interface ReposSearchState {
  hits: GithubRepo[];
  tags: Tag[];
  query: string;
}

export interface IReposSearchStore extends ReposSearchState {
  setHits: (hits: GithubRepo[]) => void;
  onSubmit: (query: string) => Promise<any>;
  request: RequestStore;
  onReset: () => void;
  getTextInputProps: (props?: Partial<TextInputProps>) => TextInputProps;
  clearTags: (type: TagType) => void;
  toggleTag: (tag: Tag) => void;
}

export interface ITagTypeModalStore {
  tagType: TagType | null;
  onClose: () => void;
  isOpen: boolean;
}