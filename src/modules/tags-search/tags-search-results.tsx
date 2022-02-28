import { observer } from 'mobx-react-lite';

import { TagType } from '@/domains/tags/tags.types';
import { groupBy } from '@/lib/utils/group-by';
import { TagsSearchStore } from '@/modules/tags-search/tags-search-store';

import RecommendedTags from './recommended-tags';
import TagGroupList from './tag-group-list';

const TagsSearchResults = observer(
  ({ tagsSearchStore }: { tagsSearchStore: TagsSearchStore }) => {
    const isEmptyState = tagsSearchStore.hits.length === 0;

    const content = isEmptyState ? (
      <TagsSearchResultsEmpty />
    ) : (
      <>
        {Object.entries(groupBy(tagsSearchStore.hits, 'type')).map(
          ([type, tags]) =>
            tags.length > 0 && (
              <TagGroupList
                key={`group-tags__${type}`}
                type={type as TagType}
                tags={tags}
              />
            ),
        )}
      </>
    );

    return <div className="min-w-full flex-1 md:max-w-3xl">{content}</div>;
  },
);

const TagsSearchResultsEmpty = () => {
  return (
    <>
      <RecommendedTags />
    </>
  );
};

export default TagsSearchResults;