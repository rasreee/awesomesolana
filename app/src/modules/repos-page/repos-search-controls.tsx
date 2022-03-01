import { observer } from 'mobx-react-lite';

import { useSearchQuery } from '@/contexts/search-query-context';
import SearchForm from '@/modules/common/search-form';
import { useGlobalStore } from '@/stores';

const ReposSearchControls = observer(function ReposSearchBox() {
  const { search } = useGlobalStore();
  const searchQuery = useSearchQuery();

  const onSubmit = () => {
    searchQuery.setTerm(search.value);
  };

  const onReset = () => {
    search.reset();
  };

  return (
    <SearchForm
      textInputProps={search.getTextInputProps({ autoFocused: true })}
      error={search.error}
      onSubmit={onSubmit}
      onReset={onReset}
      filters={searchQuery.tags}
    />
  );
});

export default ReposSearchControls;