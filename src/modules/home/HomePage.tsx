import { Layout } from '@/ui/layouts';

import { SearchBar } from './SearchBar';

const DESCRIPTION =
  'Browse open-source projects built on Solana, filterable by dependencies or topics.';

export function HomePage() {
  return (
    <Layout>
      <div className="mx-8 my-12 max-w-6xl">
        <div className="text-center text-4xl font-bold uppercase">
          AwesomeSolana.DEV
        </div>
        <div className="my-3 text-center text-lg">{DESCRIPTION}</div>
      </div>
      <div className="mx-auto max-w-3xl">
        <SearchBar />
      </div>
    </Layout>
  );
}
