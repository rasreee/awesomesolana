import { Tag, tagUtils } from '@core/search';
import { computed, runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { useSearchStore } from '@/stores/root-store';
import { CheckBox } from '@/ui/components';

export const TagTypeFilterOption = observer(function TagTypeFilterOption({
  tag,
  ...props
}: React.HTMLAttributes<HTMLLIElement> & {
  tag: Tag;
}) {
  const store = useSearchStore();
  const checked = computed(() =>
    tagUtils.list(store.reposSearch.tags).has(tag),
  ).get();

  const handleClick = () => runInAction(() => store.reposSearch.toggleTag(tag));

  return (
    <li
      {...props}
      className="flex cursor-pointer items-center justify-between gap-2 px-1 py-2.5"
      onClick={handleClick}
    >
      <div className="flex items-center gap-2">
        <CheckBox checked={checked} readOnly />
        <span className="text-sm leading-none">{tag.name}</span>
      </div>
      {/* <span className="bg-surface-2 rounded-lg px-1.5 py-0.5 text-xs leading-none">
        {count}
      </span> */}
    </li>
  );
});