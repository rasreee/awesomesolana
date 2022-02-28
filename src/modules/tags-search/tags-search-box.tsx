import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';
import dynamic from 'next/dynamic';

import { useRootStore } from '@/stores/root-store';
import { TextInputProps } from '@/ui/text-input';

const SearchForm = dynamic(() => import('@/modules/search/search-form'));

const TagsSearchBox = observer(function TagsSearchBox({
  onInputClick,
}: {
  onInputClick?: () => void;
}) {
  const { tagsSearch: tagsSearchStore } = useRootStore();

  const getTextInputProps = (props?: Partial<TextInputProps>): TextInputProps =>
    computed(() => ({
      ...props,
      value: tagsSearchStore.query,
      onChange: tagsSearchStore.onChange,
    })).get();

  return (
    <SearchForm
      request={tagsSearchStore.request}
      onReset={tagsSearchStore.onReset}
      onSubmit={tagsSearchStore.onSubmit}
      textInputProps={getTextInputProps({
        onClick: onInputClick,
      })}
    />
  );
});

export default TagsSearchBox;