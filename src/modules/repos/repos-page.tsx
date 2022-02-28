import { observer } from 'mobx-react-lite';
import dynamic from 'next/dynamic';

import { reposSEO } from '@/app/seo';
import PageLayout from '@/layouts/page-layout';
import { useRootStore } from '@/stores/root-store';

import Filters from './filters/filters';
import { ReposSearchBox } from './repos-search-box';

const ReposResults = dynamic(() => import('./repos-results/repos-results'));

const ReposPage = observer(function ReposPage() {
  const { reposSearch } = useRootStore();
  const seo = reposSEO(reposSearch.query);

  return (
    <PageLayout seo={seo}>
      <div className="flex flex-col gap-2">
        <ReposSearchBox />
        <Filters />
      </div>
      <ReposResults />
    </PageLayout>
  );
});

export default ReposPage;
