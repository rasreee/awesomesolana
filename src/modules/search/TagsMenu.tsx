import { useState } from 'react';

import { allTagsByType, ContentTag, TAG_TYPE_TO_PLURAL } from '@/data/tags';
import { capitalizeFirst } from '@/lib/capitalizeFirst';
import clsxm from '@/lib/clsxm';
import { Popover, Tag, TextInput } from '@/ui/components';

import { useSearch } from './SearchContext';

type TagsMenuProps = { type: ContentTag['type'] };

export const TagsMenu = ({ type }: TagsMenuProps) => {
  const { search } = useSearch();

  const [open, setOpen] = useState(false);

  const openMenu = () => setOpen(true);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <button
        onClick={openMenu}
        className={clsxm(
          open && 'border border-base-400 dark:border-base-400',
          search.tags?.map((tag) => tag.type).includes(type)
            ? 'text'
            : 'text-hint',
          'bg-surface flex w-full items-center justify-between gap-3 rounded-md bg-opacity-70 px-4 py-2 hover:bg-opacity-90 active:bg-opacity-100',
        )}
      >
        <span className="text-base leading-none">
          {capitalizeFirst(TAG_TYPE_TO_PLURAL[type])}
        </span>
        <div className="bg-surface-2 flex h-5 w-5 items-center justify-center rounded-full">
          <span className="my-auto text-xs font-medium leading-none">
            {search.tags?.length ?? 0}
          </span>
        </div>
      </button>
      <Popover
        className="bg-surface fixed top-0 left-0 max-w-fit rounded-none px-2 py-3"
        isOpen={open}
        onRequestClose={closeMenu}
      >
        <TagsSearch type={type} />
      </Popover>
    </>
  );
};

function TagsSearch({ type }: { type: ContentTag['type'] }) {
  const { removeTag } = useSearch();

  const [query, setQuery] = useState('');

  const onRemoveClick = (tag: ContentTag) => () => removeTag(tag);

  return (
    <>
      <div className="flex items-center justify-between py-4 pb-7">
        <button className="text bg-surface-1 rounded-lg bg-opacity-80 px-3 py-1 font-medium text-opacity-70">
          Clear
        </button>
        <span className="text-lg font-semibold">
          {capitalizeFirst(TAG_TYPE_TO_PLURAL[type])}
        </span>
        <button className="text rounded-lg bg-indigo-600 px-3 py-1 font-medium">
          Done
        </button>
      </div>
      <TextInput
        type="search"
        name={`${type}-filter-search`}
        value={query}
        onChange={setQuery}
        placeholder={`Search ${TAG_TYPE_TO_PLURAL[type]}...`}
        className="bg-app rounded-md text-base placeholder:text-base"
      />
      <ul className={clsxm('flex flex-wrap items-center gap-3')}>
        {allTagsByType(type).map((tag) => (
          <li key={tag.name}>
            <Tag onClickRemove={onRemoveClick(tag)}>{tag.name}</Tag>
          </li>
        ))}
      </ul>
    </>
  );
}
