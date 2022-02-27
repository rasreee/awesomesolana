import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';
import dynamic from 'next/dynamic';

import clsxm from '@/lib/utils/clsxm';
import pluralize from '@/lib/utils/pluralize';
import { capitalize } from '@/lib/utils/string';
import { TagType } from '@/modules/tags';
import { useRootStore } from '@/stores/root-store';

const ChevronDownIcon = dynamic(() => import('@/ui/icons/ChevronDownIcon'));
const XIcon = dynamic(() => import('@/ui/icons/XIcon'));

function TagButton({
  children,
  className,
  ...props
}: {
  children: any;
  className?: string;
}) {
  return (
    <div
      className={clsxm(
        'cursor-pointer',
        'py-2 px-3 sm:gap-2 sm:px-4',
        'rounded-md',
        'flex items-center justify-between',
        'min-w-max overflow-hidden',
        'font-medium',
        'flex-1',
        'bg-surface-2 text text-opacity-90',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

const RepoFilterTypeButton = observer(function RepoFilterTypeButton({
  type,
}: {
  type: TagType;
}) {
  const searchStore = useRootStore();
  const { tagTypeModal } = searchStore;

  const selectedCount = computed(
    () =>
      searchStore.reposSearch.tags.filter((tag) => tag.type === type).length,
  ).get();

  const handleRemove = () => {
    searchStore.reposSearch.clearTags(type);
  };

  return (
    <TagButton
      className={clsxm(
        (tagTypeModal.tagType && tagTypeModal.tagType === type) || selectedCount
          ? 'bg-color-primary text-white'
          : '',
      )}
    >
      <div
        className="flex flex-1 cursor-pointer items-center gap-1.5"
        onClick={() => tagTypeModal.openTagType(type)}
      >
        <span className="text-left text-base leading-none">
          {capitalize(pluralize(type))}
        </span>
        {selectedCount > 0 && (
          <span className="text-base leading-none">{`(${selectedCount})`}</span>
        )}
      </div>
      {selectedCount ? (
        <button onClick={handleRemove}>
          <XIcon className="h-4 w-4" />
        </button>
      ) : (
        <button onClick={() => tagTypeModal.openTagType(type)}>
          <ChevronDownIcon />
        </button>
      )}
    </TagButton>
  );
});

export default RepoFilterTypeButton;