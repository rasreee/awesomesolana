import {
  filtersByType,
  SEARCH_FILTERS,
  SearchFilter,
  searchFilters,
  sortFiltersByProjectCount,
  toPluralFilterType,
} from '@/api/filters';
import { getProjectsCountForTag } from '@/api/projects';
import { getIntersection } from '@/common/utils';
import { useSearch } from '@/contexts/search';
import { useSearchField } from '@/modules/search/SearchField';
import {
  CheckBox,
  PrimaryButton,
  SolidButton,
  TextInput,
} from '@/ui/components';
import { clsxm } from '@/ui/utils';

export function TagsSearch({
  type,
  onRequestClose,
}: {
  type: SearchFilter['type'];
  onRequestClose: () => void;
}) {
  const runSearch = async (searchQuery: string): Promise<SearchFilter[]> => {
    if (!searchQuery) return filtersByType(SEARCH_FILTERS, type);

    const filters = await searchFilters(searchQuery, { type }).then(
      sortFiltersByProjectCount,
    );
    return filters;
  };

  const { query, hits, setQuery, onChange } = useSearchField(runSearch);

  const {
    addFilter,
    removeFilter,
    getFilterChecked,
    clearFiltersByType,
    search,
  } = useSearch();

  const onClickTag = (tag: SearchFilter) => () => {
    if (!getFilterChecked(tag)) {
      addFilter(tag);
    } else {
      removeFilter(tag);
    }
    setQuery('');
  };

  return (
    <div className="relative z-0 h-screen overflow-y-auto">
      <div className="bg-surface sticky top-0 left-0 z-50 max-h-min w-full px-4 py-2">
        <div className="flex items-center justify-between py-4 pb-7">
          <SolidButton
            disabled={
              getIntersection(
                search.tags ?? [],
                hits,
                (a, b) => a.name === b.name,
              ).length === 0
            }
            onClick={() => clearFiltersByType(type)}
          >
            Clear
          </SolidButton>
          <span className="text-lg font-semibold">
            {toPluralFilterType(type)}
          </span>
          <PrimaryButton onClick={onRequestClose}>Done</PrimaryButton>
        </div>
        <TextInput
          type="search"
          name={`${type}-filter-search`}
          value={query}
          onChange={onChange}
          placeholder={`Search ${toPluralFilterType(type)}...`}
          className={clsxm('bg-surface-1 w-full py-3')}
        />
      </div>
      <div className="absolute z-0 flex-1 pb-10">
        <ul
          className={clsxm(
            'flex w-full flex-col items-center gap-3 overflow-y-auto pt-5',
          )}
        >
          {hits.map((hit) => (
            <li
              key={hit.name}
              className="flex w-full cursor-pointer items-center justify-between gap-2 px-1 py-1.5"
              onClick={onClickTag(hit)}
            >
              <div className="flex items-center gap-3">
                <CheckBox checked={getFilterChecked(hit)} readOnly />
                <span className="text-lg leading-none">{hit.name}</span>
                <span className="text-lg leading-none">
                  {`(${getProjectsCountForTag(hit)})`}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
