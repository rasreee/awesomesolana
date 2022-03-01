import { observer } from 'mobx-react-lite';
import dynamic from 'next/dynamic';

import { reposSEO } from '@/app/seo';
import { useGlobalStore } from '@/stores';

import PageLayout from '../common/page-layout';
import Filters from './filters/filters';
import { ReposSearchBox } from './repos-search-box';

const ReposResults = dynamic(() => import('./repos-results/repos-results'));

const ReposPage = observer(function ReposPage() {
  const { reposSearch } = useGlobalStore();
  const seo = reposSEO(reposSearch.query);

  return (
    <PageLayout seo={seo}>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <ReposSearchBox />
          <Filters />
        </div>
        <div>
          <ReposResults />
        </div>
      </div>
    </PageLayout>
  );
});

export default ReposPage;