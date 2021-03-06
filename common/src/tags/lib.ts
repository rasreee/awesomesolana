import invariant from "../invariant";
import { allTags } from "./constants";
import { Tag, TagType } from "./types";

export const tagUtils = {
  list: (arr: Tag[]) => ({
    has: (target: Tag) => arr.some((item) => isEqualTag(item, target)),
    ofType: (type: TagType) => arr.filter((tag) => tag.type === type),
    exclude: (target: Tag[]): Tag[] =>
      arr.filter((item) => !tagUtils.list(target).has(item)),
    excludeFilters: (filters: string[]): Tag[] => {
      const tags = filters.map(toTag);

      return tags;
    },
    excludeType: (type: TagType): Tag[] =>
      arr.filter((item) => item.type === type),
  }),
};
interface ToTagOptions {
  name: string;
  type: TagType;
}

export function toTag(arg: string | ToTagOptions): Tag {
  if (typeof arg === "string") {
    const found = allTags.find((tag) => tag.name === arg);
    invariant(found, `invalid tagName ${arg} for toTag`);
    return found;
  }

  const { name, type } = arg;

  const index = allTags.findIndex((tag) => tag.name === name);

  return { id: index, type, name };
}

export const isEqualTag = (a: Tag, b: Tag): boolean => {
  return a.type === b.type && a.name === b.name;
};

export async function getTagSuggestions(
  query: string,
  filters: Tag[] = []
): Promise<Tag[]> {
  if (!query) return [];

  let hits = [] as Tag[];

  const a = query.toLowerCase();

  const tagsToSearch = tagUtils.list(allTags).exclude(filters);

  hits = tagsToSearch.filter((item) => {
    const name = item.name;
    const b = name.toLowerCase().slice(0, query.length);

    return a === b;
  });

  return hits;
}

export async function getTags(
  type?: TagType | undefined | null
): Promise<Tag[]> {
  if (!type) return allTags;

  return allTags.filter((tag) => tag.type === type);
}

export const makeTag = (initialData: Partial<Tag>): Tag => {
  const defaultData = { description: "" };

  return { ...defaultData, ...initialData } as Tag;
};
